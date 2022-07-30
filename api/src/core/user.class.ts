import { hashSync, genSaltSync } from 'bcryptjs'
import { Op, Transaction as SeqTransaction } from 'sequelize'

import { _baseClass } from './_base.class'
import { _authClass } from './_auth.class'

import { db_conn } from '../db'
import { User } from '../db/models/User'

export class UserClass extends _baseClass {

	/**
	 * respond to a login attempt by generating tokens and clocking in the user
	 *
	 * @class UserClass
	 * @method login_user
	 * @param { username } [string] The name of the user trying to login
	 */
	login_user({ username }: User) {
		return User.update({ is_logged_in: true }, { where: { username }, returning: true })
			.then(u => {
				return _authClass.gen_tokens(u[1][0]);
			});
	}

	/**
	 * respond to a logout attempt by clocking out the user
	 *
	 * @class UserClass
	 * @method logout_user
	 * @param { id } [number] The id of the user trying to logout
	 */
	logout_user({ id }: User) {
		return User.update({ is_logged_in: false }, { where: { id } });
	}

	/**
	 * change a user's password
	 *
	 * @class UserClass
	 * @method change_user_password
	 * @param { id } [number] The id of the user changing their password
	 * @param { password } [string] The new password
	 */
	change_user_password({ id, password }: User) {
		const hash: string = hashSync(password, genSaltSync());
		return User.update({ password: hash }, { where: { id } });
	}

	/**
	 * create a new user
	 *
	 * @class UserClass
	 * @method create_user
	 * @param { fullname, username } [number] the new user information
	 */
	async create_user({ fullname, username }: User) {
		let new_password: string = _authClass.gen_hash(8);
		const hash: string = hashSync(new_password, genSaltSync());

		// start sequelize transaction
		const t: SeqTransaction = await db_conn.transaction();

		try {
			// create the user
			const u: User = await User.create(
				{ fullname, username, password: hash },
				{ transaction: t }
			);

			// set the password to be returned
			u.password = new_password;

			// commit the transaction and return
			t.commit();
			return { u };
		} catch (err) {
			console.log(err);
			t.rollback();
			throw (err);
		}
	}

	/**
	 * modify the information of a user
	 *
	 * @class UserClass
	 * @method modify_user
	 * @param { fullname, username, can_login } [number] the user information that is changing
	 */
	modify_user({ id, fullname, username, can_login }: User) {
		return User.update({ fullname, username, can_login }, { where: { id }, returning: true });
	}

	/**
	 * reset a user's password
	 *
	 * @class UserClass
	 * @method reset_user_password
	 * @param { id } [number] the id of the user whose password is to be reset
	 */
	reset_user_password({ id }: User) {
		let password = _authClass.gen_hash(8);
		const hash: string = hashSync(password, genSaltSync());
		return User.update({ password: hash }, { where: { id }, returning: true })
			.then((q) => {
				q[1][0].password = password;
				return q;
			});
	}

	/**
	 * delete a user
	 *
	 * @class UserClass
	 * @method delete_user
	 * @param { fullname, username, can_login } [number] the user information that is changing
	 */
	async delete_user({ id }: User) {
		// start sequelize transaction
		const t: SeqTransaction = await db_conn.transaction();

		try {
			// remove the user
			let res = await User.destroy({ where: { id } });

			// commit the transaction and return
			t.commit();
			return res;
		} catch (err) {
			console.log(err);
			t.rollback();
			throw (err);
		}
	}
}
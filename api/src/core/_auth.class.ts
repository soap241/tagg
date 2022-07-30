import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'
import * as randomstring from "randomstring"
import { Op } from 'sequelize'

import { _baseClass } from './_base.class'
import { ServerData } from '../db/models/ServerData'

import { User } from '../db/models/User'
import { UserHasPermission } from '../db/models/UserHasPermission'


export class _authClass extends _baseClass {
	/**
	 * permissions matrix for all routes
	 */
	private static route_perms: { [key: string]: string[] } = {
		'/account/create-saver': ['manage-accounts'],
		'/account/create-other': ['manage-accounts'],
		'/account/modify': ['manage-accounts'],
		'/account/delete': ['manage-accounts'],

		'/customer/create': ['create-customers'],
		'/customer/modify': ['manage-customers'],
		'/customer/delete': ['manage-customers'],

		'/permission/modify': ['manage-user-permissions'],

		'/service/create': ['manage-services'],
		'/service/modify': ['manage-services'],
		'/service/delete': ['manage-services'],

		'/sms/delete': ['manage-sms'],
		'/sms/resend': ['manage-sms'],
		'/sms/send': ['send-sms'],
		'/sms/settings': ['manage-sms-settings'],

		'/transaction/create': ['create-transactions'],
		'/transaction/export': ['export-transactions'],
		'/transaction/rollback': ['rollback-transactions'],

		'/transfer/accept': ['manage-user-transfers'],
		'/transfer/create': ['manage-user-transfers'],
		'/transfer/delete': ['manage-user-transfers'],

		'/user/create': ['manage-users'],
		'/user/delete': ['manage-users'],
		'/user/login': [],
		'/user/logout': [],
		'/user/modify': ['manage-users'],
		'/user/password': [],
		'/user/reset': ['manage-users'],
		'/user/transfer': ['manage-users'],

		'/view/accounts': ['view-accounts'],
		'/view/dashboard': ['view-dashboard'],
		'/view/services': ['view-services'],
		'/view/sms': ['view-sms'],
		'/view/transactions': ['view-transactions'],
		'/view/users': ['view-users'],
	}

	/**
	 * Handle authentication of requests to protected routes
	 * also get permissions for user in request
	 *
	 * @class _baseRoute
	 * @method authenticate
	 * @return void
	 */
	public static authenticate_route() {
		return async (req: Request, res: Response, next: NextFunction) => {
			// login route requires no authentication
			if (req.url.endsWith('/user/login')) {
				return next();
			}

			if (!req.cookies.token) {
				res.status(401).json({});
				return;
			}

			let r = await _authClass.decode_token(req.cookies.token);
			if (!r['success']) {
				res.status(401).json({});
				return;
			}

			// update user activity and check if user id in token is valid in one fell swoop
			let q = await User.update({ last_activity: (new Date()) }, { where: { id: r['payload']['id'] } });
			if (q[0] == 0) {
				res.status(401).json({});
				return;
			}

			// now we know our user is valid, at least
			req.body['user'] = r['payload'];

			// refresh cookie
			const c = this.gen_tokens(req.body['user']);
			this.gen_cookies(res, c);

			// get and check permissions for the route
			const p = await this.get_user_permissions(req.body['user']);
			const required: string[] = this.route_perms[req.url.replace(process.env.API_BASE, '')];

			if (required && required.length > 0) {
				let v: number = 0;
				for (var i in required) {
					if (p.includes(required[i])) {
						v++;
					}
				}

				// respond with forbidden if the user fails the challenge
				if (v == 0) {
					res.status(403).json({});
					return;
				}
			}

			// view routes still need permissions for filtering
			// req.body['user']['permissions'] = p;
			req.body['user_permissions'] = p;
			return next();
		};
	}

	/**
	 * Generates cookies for logged in requests
	 *
	 * @class _authClass
	 * @method gen_cookies
	 */
	public static async get_user_permissions({ id }) {
		const perms = await UserHasPermission.findAll({
			where: { user_id: id },
			include: [UserHasPermission.associations.permission]
		});

		const perms_arr: string[] = [];
		for (var i in perms) {
			perms_arr.push(perms[i]['permission']['name']);
		} return perms_arr;
	}

	/**
	 * Generates cookies for logged in requests
	 *
	 * @class _authClass
	 * @method gen_cookies
	 */
	public static gen_cookies(res: Response, { token, fullname }) {
		res.cookie('token', token, {
			maxAge: 60 * 10 * 1000, httpOnly: true,
			secure: process.env.SERVER_ENV === 'REMOTE' ? true : false
		});
		res.cookie('fullname', fullname, {
			maxAge: 60 * 10 * 1000, httpOnly: false,
			secure: process.env.SERVER_ENV === 'REMOTE' ? true : false
		});
	}

	/**
	 * Generates a randomized string
	 *
	 * @class _authClass
	 * @method gen_hash
	 */
	public static gen_hash(length: number = 12, charset: string = 'alphabetic') {
		return randomstring.generate({
			charset: charset,
			length: length
		});
	}

	/**
	 * @class AuthClass
	 * @method inititalize_secrets
	 */
	public static async inititalize_secrets(secrets) {
		if (secrets == null) {
			secrets = (await ServerData.findOne({ where: { key: 'session' } }));

			if (secrets == null) {
				secrets = { keys: { jwt: '', login: '' } };
			} else {
				secrets = secrets['data']
			}
		}

		let users = await User.findAll({
			where: {
				is_logged_in: true,
				last_activity: {
					[Op.gt]: <any>(moment.utc().add({ hours: -1 }))
				}
			}
		});

		if (users.length == 0) {
			secrets.keys.jwt = this.gen_hash(24);
			secrets.keys.login = this.gen_hash(24);
		}

		process.env.SESSION_STRING = JSON.stringify(secrets);
		process.env.SECURE_JWT_SECRET = secrets.keys.jwt;
		process.env.LOGIN_JWT_SECRET = secrets.keys.login;

		await ServerData.upsert({ key: 'session', data: secrets });
	}

	public static gen_tokens({ id, fullname }) {
		return {
			token: jwt.sign({ id, fullname }, process.env.SECURE_JWT_SECRET),
			fullname: fullname
		}
	}

	public static decode_token(token_str: string) {
		return new Promise((resolve) => {
			jwt.verify(token_str, process.env.SECURE_JWT_SECRET, (err, payload) => {
				if (err) {
					resolve({ success: false, error: err })
					return
				}

				resolve({ success: true, payload: payload })
				return
			})
		}) as Promise<object>
	}
}
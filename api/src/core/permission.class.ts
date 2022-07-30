import { Op } from 'sequelize'

import { _baseClass } from './_base.class'
import { Permission } from '../db/models/Permission'
import { User } from '../db/models/User'
import { UserHasPermission } from '../db/models/UserHasPermission'

export class PermissionClass extends _baseClass {

	/**
	 * respond to a login attempt by generating tokens and clocking in the user
	 *
   * @class UserClass
   * @method login_user
	 * @param { user, permissions, previous_permissions } [User, Permission, Permission]
	 * 					user - the user whose permissions are to be modified
	 * 					permissions - the new state of the permissions
	 * 					previous permissions - the old state of the permissions
	 */
	modify_permissions({ user_id, current_permissions, previous_permissions }) {
		return User.findOne({ where: { id: user_id } })
			.then(async u => {
				let success: boolean = false;
				let msg: string = 'Unknown user';

				if (u) {
					msg = 'Could not modify permissions for user ' + u.fullname;

					// get all permissions in an array
					const permissions = await Permission.findAll({});
					for (var i = 0; i < current_permissions.length; i++) {
						let prev_perm = previous_permissions[i];

						// make sure we're comparing the same permissions
						if (current_permissions[i].id != prev_perm.id) {
							prev_perm = previous_permissions.find(p => p.id == current_permissions[i].id);
						}

						// now check and add or delete permissions as required
						if (current_permissions[i].has_perm != prev_perm.has_perm) {
							if (current_permissions[i].has_perm) {
								await UserHasPermission.create({ user_id: u.id, permission_id: current_permissions[i].id });
								success = true;
							} else {
								await UserHasPermission.destroy({ where: { user_id: u.id, permission_id: current_permissions[i].id } });
								success = true;
							}
						}
					}

					msg = 'Modified permissions for user ' + u.fullname;
				}

				return { success, msg };
			});
	}
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionClass = void 0;
const _base_class_1 = require("./_base.class");
const Permission_1 = require("../db/models/Permission");
const User_1 = require("../db/models/User");
const UserHasPermission_1 = require("../db/models/UserHasPermission");
class PermissionClass extends _base_class_1._baseClass {
    modify_permissions({ user_id, current_permissions, previous_permissions }) {
        return User_1.User.findOne({ where: { id: user_id } })
            .then(async (u) => {
            let success = false;
            let msg = 'Unknown user';
            if (u) {
                msg = 'Could not modify permissions for user ' + u.fullname;
                const permissions = await Permission_1.Permission.findAll({});
                for (var i = 0; i < current_permissions.length; i++) {
                    let prev_perm = previous_permissions[i];
                    if (current_permissions[i].id != prev_perm.id) {
                        prev_perm = previous_permissions.find(p => p.id == current_permissions[i].id);
                    }
                    if (current_permissions[i].has_perm != prev_perm.has_perm) {
                        if (current_permissions[i].has_perm) {
                            await UserHasPermission_1.UserHasPermission.create({ user_id: u.id, permission_id: current_permissions[i].id });
                            success = true;
                        }
                        else {
                            await UserHasPermission_1.UserHasPermission.destroy({ where: { user_id: u.id, permission_id: current_permissions[i].id } });
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
exports.PermissionClass = PermissionClass;

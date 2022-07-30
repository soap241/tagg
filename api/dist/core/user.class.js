"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const bcryptjs_1 = require("bcryptjs");
const _base_class_1 = require("./_base.class");
const _auth_class_1 = require("./_auth.class");
const db_1 = require("../db");
const User_1 = require("../db/models/User");
class UserClass extends _base_class_1._baseClass {
    login_user({ username }) {
        return User_1.User.update({ is_logged_in: true }, { where: { username }, returning: true })
            .then(u => {
            return _auth_class_1._authClass.gen_tokens(u[1][0]);
        });
    }
    logout_user({ id }) {
        return User_1.User.update({ is_logged_in: false }, { where: { id } });
    }
    change_user_password({ id, password }) {
        const hash = bcryptjs_1.hashSync(password, bcryptjs_1.genSaltSync());
        return User_1.User.update({ password: hash }, { where: { id } });
    }
    async create_user({ fullname, username }) {
        let new_password = _auth_class_1._authClass.gen_hash(8);
        const hash = bcryptjs_1.hashSync(new_password, bcryptjs_1.genSaltSync());
        const t = await db_1.db_conn.transaction();
        try {
            const u = await User_1.User.create({ fullname, username, password: hash }, { transaction: t });
            u.password = new_password;
            t.commit();
            return { u };
        }
        catch (err) {
            console.log(err);
            t.rollback();
            throw (err);
        }
    }
    modify_user({ id, fullname, username, can_login }) {
        return User_1.User.update({ fullname, username, can_login }, { where: { id }, returning: true });
    }
    reset_user_password({ id }) {
        let password = _auth_class_1._authClass.gen_hash(8);
        const hash = bcryptjs_1.hashSync(password, bcryptjs_1.genSaltSync());
        return User_1.User.update({ password: hash }, { where: { id }, returning: true })
            .then((q) => {
            q[1][0].password = password;
            return q;
        });
    }
    async delete_user({ id }) {
        const t = await db_1.db_conn.transaction();
        try {
            let res = await User_1.User.destroy({ where: { id } });
            t.commit();
            return res;
        }
        catch (err) {
            console.log(err);
            t.rollback();
            throw (err);
        }
    }
}
exports.UserClass = UserClass;

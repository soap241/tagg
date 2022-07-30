"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._authClass = void 0;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const randomstring = require("randomstring");
const sequelize_1 = require("sequelize");
const _base_class_1 = require("./_base.class");
const ServerData_1 = require("../db/models/ServerData");
const User_1 = require("../db/models/User");
const UserHasPermission_1 = require("../db/models/UserHasPermission");
class _authClass extends _base_class_1._baseClass {
    static authenticate_route() {
        return async (req, res, next) => {
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
            let q = await User_1.User.update({ last_activity: (new Date()) }, { where: { id: r['payload']['id'] } });
            if (q[0] == 0) {
                res.status(401).json({});
                return;
            }
            req.body['user'] = r['payload'];
            const c = this.gen_tokens(req.body['user']);
            this.gen_cookies(res, c);
            const p = await this.get_user_permissions(req.body['user']);
            const required = this.route_perms[req.url.replace(process.env.API_BASE, '')];
            if (required && required.length > 0) {
                let v = 0;
                for (var i in required) {
                    if (p.includes(required[i])) {
                        v++;
                    }
                }
                if (v == 0) {
                    res.status(403).json({});
                    return;
                }
            }
            req.body['user_permissions'] = p;
            return next();
        };
    }
    static async get_user_permissions({ id }) {
        const perms = await UserHasPermission_1.UserHasPermission.findAll({
            where: { user_id: id },
            include: [UserHasPermission_1.UserHasPermission.associations.permission]
        });
        const perms_arr = [];
        for (var i in perms) {
            perms_arr.push(perms[i]['permission']['name']);
        }
        return perms_arr;
    }
    static gen_cookies(res, { token, fullname }) {
        res.cookie('token', token, {
            maxAge: 60 * 10 * 1000, httpOnly: true,
            secure: process.env.SERVER_ENV === 'REMOTE' ? true : false
        });
        res.cookie('fullname', fullname, {
            maxAge: 60 * 10 * 1000, httpOnly: false,
            secure: process.env.SERVER_ENV === 'REMOTE' ? true : false
        });
    }
    static gen_hash(length = 12, charset = 'alphabetic') {
        return randomstring.generate({
            charset: charset,
            length: length
        });
    }
    static async inititalize_secrets(secrets) {
        if (secrets == null) {
            secrets = (await ServerData_1.ServerData.findOne({ where: { key: 'session' } }));
            if (secrets == null) {
                secrets = { keys: { jwt: '', login: '' } };
            }
            else {
                secrets = secrets['data'];
            }
        }
        let users = await User_1.User.findAll({
            where: {
                is_logged_in: true,
                last_activity: {
                    [sequelize_1.Op.gt]: (moment.utc().add({ hours: -1 }))
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
        await ServerData_1.ServerData.upsert({ key: 'session', data: secrets });
    }
    static gen_tokens({ id, fullname }) {
        return {
            token: jwt.sign({ id, fullname }, process.env.SECURE_JWT_SECRET),
            fullname: fullname
        };
    }
    static decode_token(token_str) {
        return new Promise((resolve) => {
            jwt.verify(token_str, process.env.SECURE_JWT_SECRET, (err, payload) => {
                if (err) {
                    resolve({ success: false, error: err });
                    return;
                }
                resolve({ success: true, payload: payload });
                return;
            });
        });
    }
}
exports._authClass = _authClass;
_authClass.route_perms = {
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
};

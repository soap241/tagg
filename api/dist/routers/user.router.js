"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const _base_router_1 = require("./_base.router");
const _auth_class_1 = require("../core/_auth.class");
const user_class_1 = require("../core/user.class");
const user_rules_1 = require("../rules/user.rules");
class UserRouter extends _base_router_1._baseRouter {
    constructor() {
        super();
    }
    static init(router, verbose) {
        if (verbose) {
            console.log(' [UserRouter::init] Creating User routes.');
        }
        router.post(process.env.API_BASE + '/user/*', this.validate(user_rules_1.UserRules), (req, res) => {
            (new UserRouter())['user_' + (req.url.split('/').pop()) + '_handler'](req, res);
        });
    }
    user_login_handler(req, res) {
        const payload = req.body.user;
        (new user_class_1.UserClass()).login_user(payload).then(p => {
            _auth_class_1._authClass.gen_cookies(res, p);
            this.send_response(res, true, { package: {}, msg: 'Welcome. Preparing your dashboard...' });
        }).catch(err => {
            this.send_error(res, err);
        });
    }
    user_logout_handler(req, res) {
        const payload = req.body.user;
        (new user_class_1.UserClass()).logout_user(payload).then(() => {
            res.clearCookie('token');
            res.clearCookie('fullname');
            this.send_response(res, true, { package: {}, msg: 'Goodbye' });
        }).catch(err => {
            this.send_error(res, err);
        });
    }
    user_password_handler(req, res) {
        const payload = req.body.user;
        payload.password = req.body.passwords.new;
        (new user_class_1.UserClass()).change_user_password(payload).then(() => {
            this.send_response(res, true, { package: {}, msg: 'password changed' });
        }).catch(err => {
            this.send_error(res, err);
        });
    }
    user_create_handler(req, res) {
        const payload = req.body.user_data;
        (new user_class_1.UserClass()).create_user(payload).then(({ u }) => {
            const { id, fullname, username, can_login, created_at } = u;
            this.send_response(res, true, {
                package: { 'new_user': { id, fullname, username, can_login, created_at } },
                msg: 'Created user ' + u.fullname + ' with password ' + u.password
            });
        }).catch(err => {
            this.send_error(res, err);
        });
    }
    user_modify_handler(req, res) {
        const payload = req.body.user_data;
        (new user_class_1.UserClass()).modify_user(payload).then((q) => {
            if (q[0] > 0) {
                const { id, fullname, username, created_at, can_login } = q[1][0];
                this.send_response(res, true, {
                    package: { 'edited_user': { id, fullname, username, created_at, can_login } },
                    msg: 'Modified information for user ' + req.body.user_data.fullname
                });
            }
            else {
                this.send_response(res, false, { package: {}, msg: 'Unknown user' });
            }
        }).catch(err => {
            this.send_error(res, err);
        });
    }
    user_reset_handler(req, res) {
        const payload = req.body.user_data;
        (new user_class_1.UserClass()).reset_user_password(payload).then((q) => {
            if (q[0] > 0) {
                this.send_response(res, true, {
                    package: {},
                    msg: 'Reset password for user ' + q[1][0].fullname + ' to ' + q[1][0].password
                });
            }
            else {
                this.send_response(res, false, { package: {}, msg: 'Unknown user' });
            }
        }).catch(err => {
            this.send_error(res, err);
        });
    }
    user_delete_handler(req, res) {
        const payload = req.body.user_data;
        (new user_class_1.UserClass()).delete_user(payload).then((q) => {
            if (q > 0) {
                this.send_response(res, true, {
                    package: {},
                    msg: 'Deleted user ' + req.body.user_data.fullname
                });
            }
            else {
                this.send_response(res, false, { package: {}, msg: 'Unknown user' });
            }
        }).catch(err => {
            this.send_error(res, err);
        });
    }
}
exports.UserRouter = UserRouter;

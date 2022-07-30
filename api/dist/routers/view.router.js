"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRouter = void 0;
const _base_router_1 = require("./_base.router");
const _auth_class_1 = require("../core/_auth.class");
const Module_1 = require("../db/models/Module");
const Permission_1 = require("../db/models/Permission");
const User_1 = require("../db/models/User");
const ui_nav_1 = require("../datasets/ui_nav");
class ViewRouter extends _base_router_1._baseRouter {
    constructor() {
        super();
    }
    static init(router, verbose) {
        if (verbose) {
            console.log(' [ViewRouter::init] Creating View routes.');
        }
        router.post(process.env.API_BASE + '/view/*', (req, res) => {
            (new ViewRouter())['load_' + (req.url.split('/').pop()) + '_view'](req, res);
        });
    }
    load_home_view(req, res) {
        const p = req.body.user_permissions;
        let nav_items = [];
        if (p.includes('view-dashboard')) {
            nav_items.push(ui_nav_1.UI_NAV.dashboard);
        }
        if (p.includes('view-users') || p.includes('view-permissions')) {
            nav_items.push(ui_nav_1.UI_NAV.users);
        }
        this.send_response(res, true, { package: { 'nav_items': nav_items } });
    }
    async load_users_view(req, res) {
        const p = req.body.user_permissions;
        let users = { can_view: (p.includes('view-users')), payload: [] };
        if (users.can_view) {
            users.payload = await User_1.User.findAll({
                attributes: ['id', 'fullname', 'username', 'created_at', 'can_login'],
                order: [['fullname', 'ASC']]
            });
        }
        let permissions = { can_view: (p.includes('view-permissions')) };
        if (permissions.can_view) {
            permissions['payload'] = await Permission_1.Permission.findAll({
                order: [['module_id', 'ASC'], ['id', 'ASC']],
                include: [Permission_1.Permission.associations.module]
            });
        }
        const modules = await Module_1.Module.findAll({});
        permissions['payload'] = JSON.parse(JSON.stringify(permissions['payload']));
        permissions['payload'].forEach(p_ => {
            p_['has_perm'] = (p.includes(p_.name) ? true : false);
        });
        this.send_response(res, true, { package: { 'users': users, 'permissions': permissions, 'user': req.body.user.id, 'modules': modules } });
    }
    async load_permissions_view(req, res) {
        const p = req.body.user_permissions;
        const p_ = await _auth_class_1._authClass.get_user_permissions({ id: req.body.meta.user_id });
        let permissions = { can_view: (p.includes('view-permissions')) };
        if (permissions.can_view) {
            permissions['payload'] = await Permission_1.Permission.findAll({
                where: req.body.meta.module_id ? { module_id: req.body.meta.module_id } : {},
                order: [['module_id', 'ASC'], ['id', 'ASC']],
                include: [Permission_1.Permission.associations.module]
            });
        }
        permissions['payload'] = JSON.parse(JSON.stringify(permissions['payload']));
        permissions['payload'].forEach(p__ => {
            p__['has_perm'] = (p_.includes(p__.name) ? true : false);
        });
        this.send_response(res, true, { package: { 'permissions': permissions, 'user': req.body.meta.user_id } });
    }
}
exports.ViewRouter = ViewRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRouter = void 0;
const _base_router_1 = require("./_base.router");
const permission_class_1 = require("../core/permission.class");
const permission_rules_1 = require("../rules/permission.rules");
class PermissionRouter extends _base_router_1._baseRouter {
    constructor() {
        super();
    }
    static init(router, verbose) {
        if (verbose) {
            console.log(' [PermissionRouter::init] Creating Permission routes.');
        }
        router.post(process.env.API_BASE + '/permission/*', this.validate(permission_rules_1.PermissionRules), (req, res) => {
            (new PermissionRouter())['permission_' + (req.url.split('/').pop()) + '_handler'](req, res);
        });
    }
    permission_modify_handler(req, res) {
        const payload = req.body;
        (new permission_class_1.PermissionClass()).modify_permissions(payload).then(({ success, msg }) => {
            this.send_response(res, success, { package: {}, msg: msg });
        }).catch(err => {
            this.send_error(res, err);
        });
    }
}
exports.PermissionRouter = PermissionRouter;

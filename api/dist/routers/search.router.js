"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRouter = void 0;
const sequelize_1 = require("sequelize");
const _base_router_1 = require("./_base.router");
const User_1 = require("../db/models/User");
class SearchRouter extends _base_router_1._baseRouter {
    constructor() {
        super();
    }
    static init(router, verbose) {
        if (verbose) {
            console.log(' [SearchRouter::init] Creating Search routes.');
        }
        router.post(process.env.API_BASE + '/search/*', (req, res) => {
            (new SearchRouter())['search_' + ((req.url.split('/').pop()).replace(/-/g, '_'))](req, res);
        });
    }
    async search_users(req, res) {
        let main_search_clause = {};
        if (req.body.meta.query_by == 'fullname') {
            main_search_clause = sequelize_1.where(sequelize_1.fn('lower', sequelize_1.col('fullname')), { [sequelize_1.Op.startsWith]: req.body.meta.query_str });
        }
        let users = await User_1.User.findAll({
            attributes: req.body.meta.query_fields,
            where: { [sequelize_1.Op.and]: [main_search_clause, req.body.meta.query_filter] },
            limit: req.body.meta.query_limit,
            order: req.body.meta.query_order
        });
        this.send_response(res, true, { package: { 'users': users } });
    }
}
exports.SearchRouter = SearchRouter;

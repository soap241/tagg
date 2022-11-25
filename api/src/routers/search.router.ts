import { Request, Response, Router } from 'express'
import * as moment from 'moment'
import { col, fn, Op, where } from 'sequelize'

import { _baseRouter } from './_base.router'

import { User } from '../db/models/User'


export class SearchRouter extends _baseRouter {

	/**
	 * Constructor.
	 *
	 * @class SearchRouter
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Create the routes to Search services.
	 *
	 * @class SearchRouter
	 * @method init
	 * @static to be called when the server initializes
	 * @param router {express.Router} main server's router singleton
	 */
	public static init(router: Router, verbose: boolean) {
		if (verbose) {
			console.log(' [SearchRouter::init] Creating Search routes.');
		}

		// parameterize and load all searches
		router.post(process.env.API_BASE + '/search/*',
			(req: Request, res: Response) => {
				(new SearchRouter())['search_' + ((req.url.split('/').pop()).replace(/-/g, '_'))](req, res);
			});
	}

	private async search_users(req: Request, res: Response) {
		let main_search_clause: any = {};

		if (req.body.meta.query_by == 'fullname') {
			main_search_clause = where(fn('lower', col('fullname')), { [Op.startsWith]: req.body.meta.query_str })
		}

		let users = await User.findAll({
			attributes: req.body.meta.query_fields,
			where: { [Op.and]: [main_search_clause, req.body.meta.query_filter] },
			limit: req.body.meta.query_limit,
			order: req.body.meta.query_order
		});

		this.send_response(res, true, { package: { 'users': users } });
	}
}

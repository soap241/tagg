import { Request, Response, Router } from 'express'

import { _baseRouter } from './_base.router'
import { PermissionClass } from '../core/permission.class'
import { PermissionRules } from '../rules/permission.rules'
import { Permission } from '../db/models/Permission'


export class PermissionRouter extends _baseRouter {

	/**
   * Constructor.
   *
   * @class PermissionRouter
   * @constructor
   */
	constructor(){
		super();
	}

	/**
	 * Create the routes to Permission services.
	 *
	 * @class PermissionRouter
	 * @method init
	 * @static to be called when the server initializes
	 * @param router {express.Router} main server's router singleton
	 */
	public static init(router: Router, verbose: boolean){
		if (verbose) {
			console.log(' [PermissionRouter::init] Creating Permission routes.');
		}

		router.post(process.env.API_BASE + '/permission/*',
			this.validate(PermissionRules), (req: Request, res: Response) => {
				(new PermissionRouter())['permission_' + (req.url.split('/').pop()) + '_handler'](req, res);
			})
	}

	private permission_modify_handler(req: Request, res: Response) {
		const payload = req.body;
		(new PermissionClass()).modify_permissions(payload).then(({success, msg}) => {
			this.send_response(res, success, {package:{}, msg: msg});
		}).catch(err => {
			this.send_error(res, err);
		})
	}
}

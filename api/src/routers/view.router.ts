import { Request, Response, Router } from 'express'
import { col, fn, literal, Op, where } from 'sequelize'

import { _baseRouter } from './_base.router'

import { _authClass } from '../core/_auth.class'

import { Module } from '../db/models/Module'
import { Permission } from '../db/models/Permission'
import { ServerData } from '../db/models/ServerData'
import { User } from '../db/models/User'

import { UI_NAV } from '../datasets/ui_nav'


export class ViewRouter extends _baseRouter {

	/**
	 * Constructor.
	 *
	 * @class ViewRouter
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Create the routes to View services.
	 *
	 * @class ViewRouter
	 * @method init
	 * @static to be called when the server initializes
	 * @param router {express.Router} main server's router singleton
	 */
	public static init(router: Router, verbose: boolean) {
		if (verbose) {
			console.log(' [ViewRouter::init] Creating View routes.');
		}

		// parameterize and load all views
		router.post(process.env.API_BASE + '/view/*',
			(req: Request, res: Response) => {
				(new ViewRouter())['load_' + (req.url.split('/').pop()) + '_view'](req, res);
			});
	}

	private load_home_view(req: Request, res: Response) {
		const p: string[] = req.body.user_permissions;
		let nav_items = [];

		// add dashboard
		if (p.includes('view-dashboard')) {
			nav_items.push(UI_NAV.dashboard);
		}

		// add users
		if (p.includes('view-users') || p.includes('view-permissions')) {
			nav_items.push(UI_NAV.users);
		}

		this.send_response(res, true, { package: { 'nav_items': nav_items } });
	}

	private async load_users_view(req: Request, res: Response) {
		const p: string[] = req.body.user_permissions;

		// load users:
		let users = { can_view: (p.includes('view-users')), payload: <User[]>[] };
		if (users.can_view) {
			users.payload = await User.findAll({
				attributes: ['id', 'fullname', 'username', 'created_at', 'can_login'],
				order: [['fullname', 'ASC']]
			});
		}

		// load permissions:
		let permissions = { can_view: (p.includes('view-permissions')) };
		if (permissions.can_view) {
			permissions['payload'] = await Permission.findAll({
				order: [['module_id', 'ASC'], ['id', 'ASC']],
				include: [Permission.associations.module]
			});
		}

		const modules = await Module.findAll({})

		permissions['payload'] = JSON.parse(JSON.stringify(permissions['payload']));
		permissions['payload'].forEach(p_ => {
			p_['has_perm'] = (p.includes(p_.name) ? true : false);
		});

		this.send_response(res, true, { package: { 'users': users, 'permissions': permissions, 'user': req.body.user.id, 'modules': modules } });
	}

	private async load_permissions_view(req: Request, res: Response) {
		const p: string[] = req.body.user_permissions;
		const p_: string[] = await _authClass.get_user_permissions({ id: req.body.meta.user_id });

		// load permissions:
		let permissions = { can_view: (p.includes('view-permissions')) };
		if (permissions.can_view) {
			permissions['payload'] = await Permission.findAll({
				where: req.body.meta.module_id ? { module_id: req.body.meta.module_id } : {},
				order: [['module_id', 'ASC'], ['id', 'ASC']],
				include: [Permission.associations.module]
			});
		}

		permissions['payload'] = JSON.parse(JSON.stringify(permissions['payload']));
		permissions['payload'].forEach(p__ => {
			p__['has_perm'] = (p_.includes(p__.name) ? true : false);
		});

		this.send_response(res, true, { package: { 'permissions': permissions, 'user': req.body.meta.user_id } });
	}
}

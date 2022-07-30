import { Request, Response, Router } from 'express'

import { _baseRouter } from './_base.router'
import { _authClass } from '../core/_auth.class'
import { UserClass } from '../core/user.class'
import { UserRules } from '../rules/user.rules'
import { User } from '../db/models/User'


export class UserRouter extends _baseRouter {

	/**
	 * Constructor.
	 *
	 * @class UserRouter
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Create the routes to User services.
	 *
	 * @class UserRouter
	 * @method init
	 * @static to be called when the server initializes
	 * @param router {express.Router} main server's router singleton
	 */
	public static init(router: Router, verbose: boolean) {
		if (verbose) {
			console.log(' [UserRouter::init] Creating User routes.');
		}

		router.post(process.env.API_BASE + '/user/*',
			this.validate(UserRules), (req: Request, res: Response) => {
				(new UserRouter())['user_' + (req.url.split('/').pop()) + '_handler'](req, res);
			})
	}

	private user_login_handler(req: Request, res: Response) {
		const payload = req.body.user as User;
		(new UserClass()).login_user(payload).then(p => {
			_authClass.gen_cookies(res, p);
			this.send_response(res, true, { package: {}, msg: 'Welcome. Preparing your dashboard...' });
		}).catch(err => {
			this.send_error(res, err);
		})
	}

	private user_logout_handler(req: Request, res: Response) {
		const payload = req.body.user as User;
		(new UserClass()).logout_user(payload).then(() => {
			res.clearCookie('token');
			res.clearCookie('fullname');
			this.send_response(res, true, { package: {}, msg: 'Goodbye' });
		}).catch(err => {
			this.send_error(res, err);
		})
	}

	private user_password_handler(req: Request, res: Response) {
		const payload = req.body.user as User;
		payload.password = req.body.passwords.new;
		(new UserClass()).change_user_password(payload).then(() => {
			this.send_response(res, true, { package: {}, msg: 'password changed' });
		}).catch(err => {
			this.send_error(res, err);
		})
	}

	private user_create_handler(req: Request, res: Response) {
		const payload = req.body.user_data as User;
		(new UserClass()).create_user(payload).then(({ u }) => {
			const { id, fullname, username, can_login, created_at } = u;
			this.send_response(res, true, {
				package: { 'new_user': { id, fullname, username, can_login, created_at } },
				msg: 'Created user ' + u.fullname + ' with password ' + u.password
			});
		}).catch(err => {
			this.send_error(res, err);
		})
	}

	private user_modify_handler(req: Request, res: Response) {
		const payload = req.body.user_data as User;
		(new UserClass()).modify_user(payload).then((q) => {
			if (q[0] > 0) {
				const { id, fullname, username, created_at, can_login } = q[1][0] as User;
				this.send_response(res, true, {
					package: { 'edited_user': { id, fullname, username, created_at, can_login } },
					msg: 'Modified information for user ' + req.body.user_data.fullname
				});
			} else {
				this.send_response(res, false, { package: {}, msg: 'Unknown user' });
			}
		}).catch(err => {
			this.send_error(res, err);
		})
	}

	private user_reset_handler(req: Request, res: Response) {
		const payload = req.body.user_data as User;
		(new UserClass()).reset_user_password(payload).then((q) => {
			if (q[0] > 0) {
				this.send_response(res, true, {
					package: {},
					msg: 'Reset password for user ' + q[1][0].fullname + ' to ' + q[1][0].password
				});
			} else {
				this.send_response(res, false, { package: {}, msg: 'Unknown user' });
			}
		}).catch(err => {
			this.send_error(res, err);
		})
	}

	private user_delete_handler(req: Request, res: Response) {
		const payload = req.body.user_data as User;
		(new UserClass()).delete_user(payload).then((q) => {
			if (q > 0) {
				this.send_response(res, true, {
					package: {},
					msg: 'Deleted user ' + req.body.user_data.fullname
				});
			} else {
				this.send_response(res, false, { package: {}, msg: 'Unknown user' });
			}
		}).catch(err => {
			this.send_error(res, err);
		})
	}
}

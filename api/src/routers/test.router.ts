import { Request, Response, NextFunction, Router } from 'express';

import { _baseRouter } from './_base.router';

export class TestRouter extends _baseRouter {

	/**
   * Constructor.
   *
   * @class TestRouter
   * @constructor
   */
	constructor(){
		super();
	}

	/**
	 * Create the routes to Test services.
	 *
	 * @class TestRouter
	 * @method init
	 * @static to be called when the server initializes
	 * @param router {express.Router} main server's router singleton
	 */
	public static init(router: Router, verbose: boolean){
		//log
		if (verbose) {
			console.log(' [TestRouter::init] Creating Test routes.');
		}

		//Test
		router.get(process.env.API_BASE + '/test',
			(req: Request, res: Response, next: NextFunction) => {
				(new TestRouter()).test_handler(req, res);
			})
	}

	private test_handler(req: Request, res: Response) {
		this.send_response(res, true, {'msg': 'Hello World', 'package': {}})
	}
}
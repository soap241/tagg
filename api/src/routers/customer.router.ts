import { Request, Response, Router } from 'express'

import { _baseRouter } from './_base.router'
import { _authClass } from '../core/_auth.class'
import { Customer } from '../db/models/Customer';
import { CustomerClass } from '../core/customer.class';



export class CustomerRouter extends _baseRouter {

	/**
	 * Constructor.
	 *
	 * @class ViewRouter
	 * @constructor
	 */
	constructor() {
		super();
	}

    public static init(router: Router, verbose: boolean) {
		if (verbose) {
			console.log(' [CustomerRouter::init] Creating r routes.');
		}

		router.post(process.env.API_BASE + '/customer/*', (req: Request, res: Response) => {
				(new CustomerRouter())['customer_' + (req.url.split('/').pop()) + '_handler'](req, res);
		})
	}

	private customer_create_handler(req: Request, res: Response) {

		const payload =  req.body.customer_data as Customer;

		 (new CustomerClass()).create_customer(payload).then( ({customer}) => {

			console.log( customer)

			this.send_response(res, true, {
				package: {},
				msg: 'Successfully added the customer account'
			});

		 }).catch(err => {
				this.send_error(res, err);
		 })

	}

	private customer_edit_handler(req: Request, res: Response) {

		const payload =  req.body.customer_data as Customer;

		(new CustomerClass()).edit_customer(payload).then( (q) => {

		   console.log(q[1])

           if (q[0] > 0) {

			this.send_response(res, true, {
				package: {},
				msg: 'Successfully edited the customer account'
			});

		   } else {
		   	this.send_response(res, false, { package: {}, msg: 'Unknown account' });
		   }

		}).catch(err => {
			   this.send_error(res, err);
		})

	}
}
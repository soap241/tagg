import { Request, Response, Router } from 'express'

import { _baseRouter } from './_base.router'
import { _authClass } from '../core/_auth.class'

export class NetsuiteRouter extends _baseRouter {
    
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
			console.log(' [NetsuiteRouter::init] Creating r routes.');
		}

        router.post(process.env.API_BASE + '/netsuite/*', (req: Request, res: Response) => {
            (new NetsuiteRouter())['netsuite_' + (req.url.split('/').pop()) + '_handler'](req, res);
        })
	}


    private async netsuite_customerprojects_handler(req: Request, res: Response) {
       const customer_id = req.body.customer_id as string;

       this.send_netsuite_req(662, { cmd: '/customer-projects', customer_id })
            .then((response: any) => {
             //   this.send_response(req, res, true, { package: {} });
                
			this.send_response(res, true, {
				package: {"projects": response.data },
				msg: 'Success'
			});
            //  console.log(response.data);
            })
            .catch((err) => {
                console.log(err)
                this.send_error(res, err);
            });
    }
}
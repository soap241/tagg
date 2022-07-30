import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../utility/auth.utility-service';
import { ToasterService } from '../utility/toaster.utility-service';

import { environment } from '../../../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
	constructor(private authService: AuthService,
							private toasterService: ToasterService,
							private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// modify requests here
		const fullreq = req.clone({
			headers: req.headers.set('Content-Type', 'application/json'),
			url: environment.API_BASE + req.url,
			withCredentials: true
		});

		// this is when the request is sent after modification
		return next.handle(fullreq)
			.pipe(
				// modify responses here
				map(event => {
					if (event instanceof HttpResponse) {
						if (!(event['body'] instanceof Blob)) {
							event = event.clone({
								body: {
									success: event.body['success'],
									msg: event.body['msg'],
									data: event.body['data']
								}
							});
						}
					}
					return event;
				}),

				catchError((err: any, caught: any) => {
					// authentication error
					if (err.status == 401) {
						this.authService.logout_user();
						this.router.navigate(['../login']);
						err = 'handled';
					}
					// forbidden error
					if (err.status == 403) {
						let err_msg: string = 'You do not have the permissions required to ';
						if (req.url.includes('view')) {
							err_msg += 'view this page';
						} else {
							err_msg += 'perform this action';
						}
						this.toasterService.make_toast({msg: err_msg, type: 'error'}, 10);
						err = 'handled';
					}
					return throwError(err);
				})
			);
	}
}
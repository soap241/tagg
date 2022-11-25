import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from '../utility/auth.utility-service';

import { Customer } from '../../models/customer.model';


@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private httpService: HttpClient,
							private authService: AuthService) { }

	create_customer(customer: Customer): Observable<any> {
		const _body = {'customer_data': customer};

		return this.httpService.post('/customer/create', _body)
			.pipe(
				tap(res => {
					if (res['success']) {
					return true
					}
				}),
				catchError(this.handleError('create', {'msg': 'Oops, there seems to be a problem'}))
				);

			
	}
	modify_customer(customer: Customer): Observable<any> {
		const _body = {'customer_data': customer};

		return this.httpService.post('/customer/edit', _body)
			.pipe(
				tap(res => {
					if (res['success']) {
					return true
					}
				}),
				catchError(this.handleError('edit', {'msg': 'Oops, there seems to be a problem'}))
				);

			
	}

	// logout_user(): Observable<any> {
	// 	const _body = {};

	// 	return this.httpService.post('/user/logout', _body)
	// 		.pipe(
	// 			tap(res => {
	// 				if (res['success']) {
	// 					this.authService.logout_user();
	// 				}
	// 			}),
	// 			catchError(this.handleError('logout', {'msg': 'Oops, there seems to be a problem'}))
	// 		);
	// }

	private handleError<T> (operation = 'operation', result?) {
		return (error: any): Observable<T> => {
			if (error == 'handled') {
				result['msg'] = error;
			}
			return of(result);
		};
	}
}
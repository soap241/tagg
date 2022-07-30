import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from '../utility/auth.utility-service';

import { User } from '../../models/user.model';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private httpService: HttpClient,
							private authService: AuthService) { }

	login_user(user: User): Observable<any> {
		const _body = {'user': user};

		return this.httpService.post('/user/login', _body)
			.pipe(
				tap(res => {
					if (res['success']) {
						this.authService.login_user();
					}
				}),
				catchError(this.handleError('login', {'msg': 'Oops, there seems to be a problem'}))
			);
	}

	logout_user(): Observable<any> {
		const _body = {};

		return this.httpService.post('/user/logout', _body)
			.pipe(
				tap(res => {
					if (res['success']) {
						this.authService.logout_user();
					}
				}),
				catchError(this.handleError('logout', {'msg': 'Oops, there seems to be a problem'}))
			);
	}

	private handleError<T> (operation = 'operation', result?) {
		return (error: any): Observable<T> => {
			if (error == 'handled') {
				result['msg'] = error;
			}
			return of(result);
		};
	}
}
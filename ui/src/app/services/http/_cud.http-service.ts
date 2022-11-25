import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { saveAs } from 'file-saver';

@Injectable({
	providedIn: 'root'
})
export class _cudService {

	constructor(private httpService: HttpClient) { }

	handle(element: string, action: string, params: any): Observable<any> {
		const _body = params;
		const _route: string = '/' + element + '/' + action;

		return this.httpService.post(_route, _body)
			.pipe(
				catchError(this.handleError(action + ' ' + element, {'msg': 'Oops, there seems to be a problem'}))
			);
	}

	export(element: string, action: string, params: any): Observable<any> {
		const _body = params;
		const _route: string = '/' + element + '/' + action;

		return this.httpService.post(_route, _body, { responseType: 'blob' })
			.pipe(
				map(res => {
					if (res['type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
						saveAs(res, params['title'] + '.xlsx');
						return { 'msg': 'success' };
					} else { return { 'msg': 'File download failed' }; }
				}),
				catchError(this.handleError('export logs', {}))
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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ViewService {

	constructor(private httpService: HttpClient) { }

	load_view(view: string, meta?: {}): Observable<any> {
		return this.httpService.post('/view/' + view, {'meta': meta})
			.pipe(
				catchError(this.handleError('load ' + view, {'msg': 'Oops, there seems to be a problem'}))
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
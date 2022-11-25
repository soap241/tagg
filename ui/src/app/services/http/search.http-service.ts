import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SearchQuery } from '../../models/searchquery.model';


@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private httpService: HttpClient) { }

	load_search(search: string, meta?: SearchQuery): Observable<any> {
		return this.httpService.post('/search/' + search, {'meta': meta})
			.pipe(
				map(res => res['data'][search]),
				catchError(this.handleError('search ' + search, {'msg': 'Oops, there seems to be a problem'}))
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
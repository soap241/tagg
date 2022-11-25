import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class UtilityService {
	generate_string(charset: string='alphabetic', length: number=8) {
		const charsets = {
			'alphabetic': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'alphabetic_lower': 'abcdefghijklmnopqrstuvwxyz',
			'alphabetic_upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'alphanumeric': '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'alphanumeric_lower': '0123456789abcdefghijklmnopqrstuvwxyz',
			'alphanumeric_upper': '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		}

		let str: string = '';
		for (var i = length; i > 0; --i){
			str += charsets[charset][Math.floor(Math.random() * charsets[charset].length)];
		}
		return str;
	}
}

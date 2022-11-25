import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../utility/auth.utility-service';


@Injectable()
export class LoginGuardService implements CanActivate {

	constructor(private router: Router,
							private authService: AuthService) {}

	canActivate() {
		if (this.authService.is_logged_in()) {
			this.router.navigate(['/dashboard']);
			return false;
		} else {
			return true;
		}
	}
}

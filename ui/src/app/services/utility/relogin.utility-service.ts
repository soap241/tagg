import { Injectable } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class ReloginService {
	browser_refreshed: boolean = false;
	relogin_req: boolean = false;

	constructor (private router: Router) {
		this.router.events.subscribe((r) => {
			if (r instanceof NavigationStart && !this.router.navigated) {
				this.browser_refreshed = true;
			} else if (r instanceof NavigationEnd && this.browser_refreshed) {
				this.browser_refreshed = false;
			}
		});
	}

	trigger_relogin() {
		if (!this.browser_refreshed) {
			this.relogin_req = true;
		} else {
			this.relogin_req = false;
		}
		return this.relogin_req;
	}
}

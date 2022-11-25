import { Injectable } from '@angular/core';

import { UtilityService } from './utility.utility-service';

import { Toast } from '../../models/toast.model';


@Injectable({
	providedIn: 'root'
})
export class ToasterService {
	toast_plate: string[] = [];
	toaster: { [key: string]: Toast } = {};

	private icons = {
		success: 'icon-check',
		error: 'icon-close',
		load: 'fa fa-circle-o-notch fa-spin',
		info: 'icon-info',
		confirm: 'icon-question'
	}

	private titles = {
		success: 'Success',
		error: 'Error',
		load: 'Please Wait',
		info: 'Notice',
		confirm: 'Warning'
	}

	constructor(private utilityService: UtilityService) {}

	make_toast(t: Toast, timeout: number=4) {
		do {
			t.key = this.utilityService.generate_string('alphabetic', 6);
		} while(this.toast_plate.includes(t.key));

		t.icon_str = this.icons[t.type];
		t.title = this.titles[t.type];

		if (timeout > 0) {
			t.watcher = setTimeout(() => {
				this.pop_toast(t.key);
			}, timeout*1000);
		}

		this.toaster[t.key] = t;
		this.toast_plate.unshift(t.key);
		return t.key;
	}

	amend_toast(key: string, t: Toast, timeout: number=4) {
		if (!this.has_toast(key)) {
			return;
		}

		clearTimeout(this.toaster[key].watcher);

		t.icon_str = this.icons[t.type];
		t.title = this.titles[t.type];

		if (timeout > 0) {
			t.watcher = setTimeout(() => {
				this.pop_toast(key);
			}, timeout*1000);
		}

		t.key = key;
		this.toaster[key] = t;
	}

	has_toast(key: string) {
		return Object.keys(this.toaster).includes(key);
	}

	trigger_pop_toast(key: string) {
		if (!this.has_toast(key)) {
			return;
		}

		clearTimeout(this.toaster[key].watcher);
		this.pop_toast(key);
	}

	private pop_toast(key: string) {
		if (!this.has_toast(key)) {
			return;
		}

		this.toast_plate.splice(this.toast_plate.findIndex(e => e == key), 1);
		delete this.toaster[key];
	}
}

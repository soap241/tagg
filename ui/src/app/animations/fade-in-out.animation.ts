import { trigger, style, transition, animate } from '@angular/animations';


export function fade_in_out(in_time = 100, out_time = 100) {
	return trigger('fadeInOut', [
		transition(':enter', [
			style({ opacity: 0 }),
			animate(in_time + 'ms ease-in-out', style({ opacity: 1 }))
		]),
		transition(':leave', [
			style({ opacity: 1 }),
			animate(out_time + 'ms ease-in-out', style({ opacity: 0 }))
		])
	]);
}
import { trigger, state, style, transition, animate } from '@angular/animations';


export function toaster_in_out(translation = -50, in_time = 100, out_time = 100, delay = '') {
	return trigger('toasterInOut', [
		state('void', style({
			transform: 'translateY(' + translation + '%)'
		})),
		transition('void => *', animate(in_time + 'ms ' + delay + ' ease-in')),
		transition(':leave', [
			style({ opacity: 1 }),
			animate(out_time + 'ms ease-in-out', style({ opacity: 0 }))
		])
	]);
}

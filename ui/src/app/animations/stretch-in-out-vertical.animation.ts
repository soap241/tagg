import { trigger, state, style, transition, animate } from '@angular/animations';


export function stretch_in_out_v(in_time = 100, out_time = 100, max_height = '100px') {
	return trigger('stretchInOutV', [
		transition(':enter', [
			style({ maxHeight: '0px', overflow: 'hidden' }),
			animate(in_time + 'ms ease-in-out', style({ maxHeight: max_height, overflow: 'hidden' }))
		]),
		transition(':leave', [
			style({ maxHeight: max_height, overflow: 'hidden' }),
			animate(out_time + 'ms ease-in-out', style({ maxHeight: '0px', overflow: 'hidden' }))
		])
	]);
}

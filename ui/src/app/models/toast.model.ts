export interface Toast {
	title?: string;
	msg: string;
	type: 'success' | 'error' | 'info' | 'load' | 'confirm';
	key?: string;
	icon_str?: string;
	watcher?: any;
	cannot_close?: boolean;
}
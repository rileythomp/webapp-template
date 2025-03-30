import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-debug-borders',
	templateUrl: './debug-borders.component.html',
	styleUrl: './debug-borders.component.less'
})
export class DebugBordersComponent implements OnInit {
	ngOnInit() {
		this.onToggleBorders({ target: { checked: true } });
	}

	onToggleBorders(event: any): void {
		const isChecked = (event.target as HTMLInputElement).checked;
		let elems = document.getElementsByClassName('debug-border');
		for (let i = 0; i < elems.length; i++) {
			if (isChecked) {
				elems[i].classList.add('debug-border-on');
			} else {
				elems[i].classList.remove('debug-border-on');
			}
		}
	}
}

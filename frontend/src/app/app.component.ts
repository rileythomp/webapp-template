import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
	ngOnInit() {
		let starbattle =
			`  _________ __                 __________         __    __  .__
 /   _____//  |______ _______  \\______   \\_____ _/  |__/  |_|  |   ____
 \\_____  \\\\   __\\__  \\\\_  __ \\  |    |  _/\\__  \\\\   __\\   __\\  | _/ __ \\
 /        \\|  |  / __ \\|  | \\/  |    |   \\ / __ \\|  |  |  | |  |_\\  ___/
/_______  /|__| (____  /__|     |______  /(____  /__|  |__| |____/\\___ \\
        \\/           \\/                \\/      \\/                     \\/
Please report any issues to https://github.com/rileythomp/starbattle/issues`;
		console.log(starbattle)
	}
}

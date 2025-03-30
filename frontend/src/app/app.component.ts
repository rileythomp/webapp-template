import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
	ngOnInit() {
		let webAppTemplate =
			`Web App Template

Please report any issues to https://docs.google.com/forms/d/e/1FAIpQLSdzHFumIhdsgNksr8lDUO3hHhVwaIqeO9asIhBWsroNfYZW4Q/viewform`;
		console.log(webAppTemplate)
	}
}

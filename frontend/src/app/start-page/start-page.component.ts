import { Component } from '@angular/core';
import { Game } from '../model/model';
import { StarbattleService } from '../services/starbattle.service';

@Component({
	selector: 'app-start-page',
	templateUrl: './start-page.component.html',
	styleUrl: './start-page.component.less'
})
export class StartPageComponent {
	protected game: Game;

	constructor(private starbattle: StarbattleService) { }

	ngOnInit() {
		this.starbattle.game.subscribe(game => {
			this.game = game;
		})
		this.starbattle.GetDailyGame();
		console.log(this.game);
	}
}

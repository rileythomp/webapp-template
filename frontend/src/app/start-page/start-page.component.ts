import { Component } from '@angular/core';
import { Game } from '../model/model';
import { StarbattleService } from '../services/starbattle.service';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'app-start-page',
	templateUrl: './start-page.component.html',
	styleUrl: './start-page.component.less'
})
export class StartPageComponent {
	protected game: Game;
	protected fetchedStats: boolean = false;
	protected showBoard: boolean = false;
	protected showPostGame: boolean = false;
	protected stats: any;

	constructor(
		private starbattle: StarbattleService,
		private api: ApiService
	) { }

	async ngOnInit() {
		this.starbattle.game.subscribe(async game => {
			this.game = game;
			if (game.isFinished && !this.fetchedStats) {
				this.fetchedStats = true;
				let { stats, err } = await this.api.SaveGameResult(this.game);
				if (err) {
					console.error('Error saving game result:', err);
					return;
				}
				this.stats = stats;
				setTimeout(() => {
					this.showBoard = false;
					this.showPostGame = true;
				}, 3000); // 1 second + starbattle-board.component.less rotate-star animation
			}
			if (!game.isFinished && !this.showBoard && this.showPostGame) {
				this.showPostGame = false;
				this.showBoard = true;
				this.fetchedStats = false;
			}
		});
		await this.starbattle.GetDailyGame();
		this.showBoard = true;
	}
}

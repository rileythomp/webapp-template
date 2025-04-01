import { Component } from '@angular/core';
import { StarbattleService } from '../services/starbattle.service';
import { Game, Cell } from '../model/model';

@Component({
	selector: 'app-starbattle-board',
	templateUrl: './starbattle-board.component.html',
	styleUrl: './starbattle-board.component.less'
})
export class StarbattleBoardComponent {
	protected game: Game = <Game>{};
	protected seconds: number = 0;
	private timerStarted: boolean = false;
	private timerInterval: any;

	constructor(
		private starbattle: StarbattleService,
	) { }

	ngOnInit() {
		this.starbattle.game.subscribe(game => {
			this.game = game;
			if (!this.timerStarted) {
				this.startTimer();
				this.timerStarted = true;
			}
			if (game.isFinished && this.timerInterval) {
				clearInterval(this.timerInterval);
				this.timerStarted = false;
			}
		});
	}

	formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	}

	handleCellMouseDown(cell: Cell) {
		this.starbattle.handleCellDown(cell);
	}

	handleCellMouseOver(cell: Cell) {
		this.starbattle.handleCellOver(cell);
	}

	private startTimer() {
		this.timerInterval = setInterval(() => {
			this.seconds++;
		}, 1000);
	}
}

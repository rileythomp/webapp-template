import { Component } from '@angular/core';
import { StarbattleService } from '../services/starbattle.service';
import { Cell } from '../model/model';

@Component({
	selector: 'app-starbattle-board',
	templateUrl: './starbattle-board.component.html',
	styleUrl: './starbattle-board.component.less'
})
export class StarbattleBoardComponent {
	protected board: Cell[][] = [];
	protected seconds: number = 0;
	private timerStarted: boolean = false;

	constructor(
		private starbattle: StarbattleService,
	) { }

	ngOnInit() {
		this.starbattle.game.subscribe(game => {
			this.board = game.board;
		})
	}

	formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	}

	handleCellMouseDown(cell: Cell) {
		if (!this.timerStarted) {
			this.startTimer();
			this.timerStarted = true;
		}

		if (cell.state == null || cell.state === 'empty') {
			cell.state = 'marked';
			this.starbattle.setMarkingEmpty(true);
		} else if (cell.state === 'marked') {
			cell.state = 'star';
		} else if (cell.state === 'star') {
			cell.state = 'empty';
		}
	}

	handleCellMouseOver(cell: Cell) {
		if ((cell.state == null || cell.state === 'empty') && this.starbattle.IsMarkingEmpty()) {
			cell.state = 'marked';
		}
	}

	private startTimer() {
		setInterval(() => {
			this.seconds++;
		}, 1000);
	}
}

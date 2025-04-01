import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, Cell } from '../model/model';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class StarbattleService {
	private gameSubject: BehaviorSubject<Game>;
	public game: Observable<Game>;

	constructor(private api: ApiService) {
		this.gameSubject = new BehaviorSubject<Game>(<Game>{});
		this.game = this.gameSubject.asObservable();
	}

	public handleCellDown(cell: Cell) {
		let game = this.gameSubject.getValue();
		if (!game.hasStarted) {
			game.hasStarted = true;
		}
		if (cell.state == null || cell.state === 'empty') {
			cell.state = 'marked';
			game.isMarkingEmpty = true;
		} else if (cell.state === 'marked') {
			cell.state = 'star';
			if (this.countStars() === 8) {
				game.clientEndTime = new Date().getTime()
				game.isFinished = true;
			}
		} else if (cell.state === 'star') {
			cell.state = 'empty';
		}
		game.board[cell.row][cell.column] = cell;
		this.gameSubject.next(game);
	}

	private countStars(): number {
		let game = this.gameSubject.getValue();
		let count = 0;
		for (let i = 0; i < game.board.length; i++) {
			for (let j = 0; j < game.board[i].length; j++) {
				if (game.board[i][j].state === 'star') {
					count++;
				}
			}
		}
		return count;
	}

	public handleCellOver(cell: Cell) {
		let game = this.gameSubject.getValue();
		if ((cell.state == null || cell.state === 'empty') && game.isMarkingEmpty) {
			cell.state = 'marked';
		}
		game.board[cell.row][cell.column] = cell;
		this.gameSubject.next(game);
	}

	public setMarkingEmpty(isMarkingEmpty: boolean) {
		let game = this.gameSubject.getValue();
		game.isMarkingEmpty = isMarkingEmpty;
		this.gameSubject.next(game);
	}

	public async GetDailyGame(): Promise<Error | null> {
		let { game, error } = await this.api.GetDailyGame();
		if (error) {
			return error;
		}
		game.clientStartTime = new Date().getTime();
		this.gameSubject.next(game);
		return null;
	}

	public GetGame(): Game {
		return this.gameSubject.getValue();
	}

	public async playAgain() {
		let { game, error } = await this.api.GetDailyGame(); // TODO: Update this to get a random game
		if (error) {
			console.error('Error getting game:', error);
			return;
		}
		game.clientStartTime = new Date().getTime();
		this.gameSubject.next(game);
		return null;

	}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../model/model';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class StarbattleService {
	private gameSubject: BehaviorSubject<Game>;
	public game: Observable<Game>;

	constructor(private api: ApiService) {
		this.gameSubject = new BehaviorSubject<Game>({
			board: [],
			isMarkingEmpty: false,
		});
		this.game = this.gameSubject.asObservable();
	}

	public async GetDailyGame(): Promise<Error | null> {
		let { game, error } = await this.api.GetDailyGame();
		if (error) {
			return error;
		}
		this.gameSubject.next(game);
		return null;
	}

	public setMarkingEmpty(isMarkingEmpty: boolean) {
		let game = this.gameSubject.getValue();
		game.isMarkingEmpty = isMarkingEmpty;
		this.gameSubject.next(game);
	}

	public IsMarkingEmpty(): boolean {
		return this.gameSubject.getValue().isMarkingEmpty;
	}
}

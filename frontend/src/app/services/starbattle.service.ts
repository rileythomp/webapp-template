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
			board: []
		});
		this.game = this.gameSubject.asObservable();
	}

	public async GetDailyGame(): Promise<Error | null> {
		let { dailyGame, error } = await this.api.GetDailyGame();
		if (error) {
			console.error(error);
			return error;
		}
		this.gameSubject.next(dailyGame);
		return null;
	}
}

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

	constructor(
		private starbattle: StarbattleService,
	) { }

	ngOnInit() {
		this.starbattle.game.subscribe(game => {
			this.board = game.board;
		})
	}
}

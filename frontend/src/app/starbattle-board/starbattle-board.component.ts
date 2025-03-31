import { Component } from '@angular/core';
import { StarbattleService } from '../services/starbattle.service';

@Component({
	selector: 'app-starbattle-board',
	templateUrl: './starbattle-board.component.html',
	styleUrl: './starbattle-board.component.less'
})
export class StarbattleBoardComponent {
	protected board: number[][] = [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]];

	constructor(
		private starbattle: StarbattleService,
	) { }

	ngOnInit() {
		this.starbattle.game.subscribe(game => {
			this.board = game.board;
		})
	}
}

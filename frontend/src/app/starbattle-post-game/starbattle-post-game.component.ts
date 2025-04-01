import { Component, Input } from '@angular/core';
import { StarbattleService } from '../services/starbattle.service';

@Component({
	selector: 'app-starbattle-post-game',
	templateUrl: './starbattle-post-game.component.html',
	styleUrl: './starbattle-post-game.component.less'
})
export class StarbattlePostGameComponent {
	@Input() stats: any;

	constructor(private starbattle: StarbattleService) { }

	formatTime(seconds: number): string {
		seconds = Math.round(seconds * 100) / 100;
		return (seconds >= 60 ? `${Math.floor(seconds / 60)} minutes and ` : '') + `${(seconds % 60).toFixed(2)} seconds`;
	}

	formatTop10(placement: number): string {
		if (placement === 1) {
			return '1st';
		}
		if (placement === 2) {
			return '2nd';
		}
		if (placement === 3) {
			return '3rd';
		}
		return `${placement}th`;
	}

	playAgain() {
		this.starbattle.playAgain();
	}
}

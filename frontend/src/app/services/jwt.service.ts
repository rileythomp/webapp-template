import { Injectable } from '@angular/core';

const starBattleJWT = 'starBattleJWT';

@Injectable({
	providedIn: 'root'
})
export class JwtService {
	constructor() { }

	SetJWT(jwt: string): void {
		localStorage.setItem(starBattleJWT, jwt);
	}

	GetJWT(): string {
		return localStorage.getItem(starBattleJWT) ?? '';
	}
}

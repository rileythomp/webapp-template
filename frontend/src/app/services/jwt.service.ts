import { Injectable } from '@angular/core';

const webAppTemplateJWT = 'webAppTemplateJWT';

@Injectable({
	providedIn: 'root'
})
export class JwtService {
	constructor() { }

	SetJWT(jwt: string): void {
		localStorage.setItem(webAppTemplateJWT, jwt);
	}

	GetJWT(): string {
		return localStorage.getItem(webAppTemplateJWT) ?? '';
	}
}

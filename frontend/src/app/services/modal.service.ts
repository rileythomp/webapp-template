import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private messageTimeout: NodeJS.Timeout
	messageStr: string
	message: boolean
	register: boolean
	login: boolean

	constructor() { }

	displayMessage(msg: string) {
		this.login = false
		this.register = false
		clearTimeout(this.messageTimeout)
		this.messageStr = msg
		this.message = true
		this.messageTimeout = setTimeout(() => {
			this.message = false
		}, 10000)
	}

	displayRegister() {
		this.login = false
		this.register = true
	}

	displayLogin() {
		this.register = false
		this.login = true
	}

	hideRegister() {
		this.register = false
	}

	hideLogin() {
		this.login = false
	}

	showRegister(): boolean {
		return this.register
	}

	showLogin(): boolean {
		return this.login
	}
}

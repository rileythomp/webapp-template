import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/model';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
	selector: 'app-global-navbar',
	templateUrl: './global-navbar.component.html',
	styleUrl: './global-navbar.component.less',
	animations: [
		trigger('slideDownUp', [
			state('void', style({ transform: 'scaleY(0)' })),
			state('*', style({ transform: 'scaleY(1)' })),
			transition('* <=> void', animate('0.3s')),
		]),
	],
})
export class GlobalNavbarComponent implements OnInit {
	protected showAuthOptions: boolean = false
	protected user: User

	constructor(
		protected router: Router,
		private auth: AuthService,
		protected modal: ModalService,
	) { }

	ngOnInit() {
		this.auth.user.subscribe(user => {
			this.user = user
		})
		this.auth.GetUser()
		console.log(this.user)
	}

	async signIn(provider: string) {
		if (await this.auth.SignIn(provider)) {
			this.handleAuthError('Uh oh, there was an unexpected error signing in. Please try again.')
		}
	}

	async signOut() {
		if (await this.auth.SignOut()) {
			this.handleAuthError('Uh oh, there was an unexpected error signing out. Please try again.')
			return
		}
		location.replace('');
	}

	startRegistration() {
		this.showAuthOptions = false
		this.modal.displayRegister()
	}

	handleAuthError(msg: string) {
		this.showAuthOptions = false
		this.modal.displayMessage(msg)
	}

	startLogin() {
		this.showAuthOptions = false
		this.modal.displayLogin()
	}

	goToProfile() {
		this.showAuthOptions = false
		this.router.navigate(['/profile'])
	}
}

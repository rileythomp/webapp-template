import { Component, OnInit } from '@angular/core'
import { User } from '../model/model'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-join',
	templateUrl: './join.component.html',
	styleUrls: ['./join.component.less'],
})
export class JoinComponent implements OnInit {
	protected user: User

	constructor(
		private auth: AuthService,
	) { }

	ngOnInit() {
		this.auth.user.subscribe(user => {
			this.user = user
		})
	}
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { JoinComponent } from './join/join.component';
import { ProfileComponent } from './profile/profile.component';
import { InstructionsComponent } from './instructions/instructions.component';

const routes: Routes = [
	{ path: '', component: JoinComponent },
	{ path: 'join', component: JoinComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'profile/:name', component: ProfileComponent },
	{ path: 'password-reset', component: PasswordResetComponent },
	{ path: 'instructions', component: InstructionsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

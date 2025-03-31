import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth/auth-button/auth-button.component';
import { LoginComponent } from './auth/login/login.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PwReqComponent } from './auth/pw-req/pw-req.component';
import { RegisterComponent } from './auth/register/register.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { JoinComponent } from './join/join.component';
import { ProfileComponent } from './profile/profile.component';
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';
import { DebugBordersComponent } from './debug-borders/debug-borders.component';
import { StarbattleBoardComponent } from './starbattle-board/starbattle-board.component';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DebugBordersComponent,
    GlobalNavbarComponent,
    JoinComponent,
    InstructionsComponent,
    AuthButtonComponent,
    RegisterComponent,
    PwReqComponent,
    LoginComponent,
    ProfileComponent,
    PasswordResetComponent,
    NewPasswordComponent,
    StarbattleBoardComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

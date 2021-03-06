import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PaperSetterRoutingModule } from './paper-setter-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent, LogoutComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    PaperSetterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ]
})
export class PaperSetterModule { }

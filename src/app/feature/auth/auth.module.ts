import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthService } from './services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ChangePasswordComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers : [
    AuthService
  ]
})
export class AuthModule { }

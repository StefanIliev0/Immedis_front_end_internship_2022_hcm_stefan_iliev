import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path:"auth", component : AuthComponent , 
  children : [
    {path : "login" , component : LoginComponent},
    {path : `change_password` , component : ChangePasswordComponent},
    {path : 'logout' , component : LogoutComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

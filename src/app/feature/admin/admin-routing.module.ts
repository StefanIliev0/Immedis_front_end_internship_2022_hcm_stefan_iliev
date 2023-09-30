import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { DashboardComponent } from '../company/components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {path:"", component : AdminComponent ,
children : [
  {path : "dashboard" , component : DashboardComponent , canActivate : [authGuard]},
  {path : "dashboard/:leveOne" , component : DashboardComponent , canActivate : [authGuard]},
  {path : "dashboard/:leveOne/:levelTwo" , component : DashboardComponent , canActivate : [authGuard]},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree" , component : DashboardComponent , canActivate : [authGuard]},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour" , component : DashboardComponent , canActivate : [authGuard]},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour/:levelFive" , component : DashboardComponent , canActivate : [authGuard]},
  {path : "new" , component : NewCompanyComponent , pathMatch : 'full' , canActivate : [authGuard]},
  
], canActivate : [authGuard]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

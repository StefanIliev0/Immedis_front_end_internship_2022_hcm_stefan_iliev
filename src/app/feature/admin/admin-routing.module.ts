import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { DashboardComponent } from '../company/components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {path:"", component : AdminComponent ,
children : [
  {path : "dashboard" , component : DashboardComponent},
  {path : "dashboard/:leveOne" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour/:levelFive" , component : DashboardComponent},
  {path : "new" , component : NewCompanyComponent , pathMatch : 'full'},
  
]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

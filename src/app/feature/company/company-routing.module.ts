import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyComponent } from './components/company/company.component';

const routes: Routes = [
  {path:":company", component : CompanyComponent , pathMatch : `prefix` ,
children : [
  {path : "dashboard" , component : DashboardComponent},
  {path : "dashboard/:leveOne" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour/:levelFive" , component : DashboardComponent},
  
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }

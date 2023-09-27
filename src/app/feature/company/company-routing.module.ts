import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyComponent } from './components/company/company.component';
import { HireEmployeeComponent } from './components/hire-employee/hire-employee.component';
import { NewContractComponent } from './components/new-contract/new-contract.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeInformationComponent } from './components/employee-information/employee-information.component';
import { EmployeeContractsComponent } from './components/employee-contracts/employee-contracts.component';
import { EmployeePayslipsComponent } from './components/employee-payslips/employee-payslips.component';
import { AprovePaycheckDataComponent } from './components/aprove-paycheck-data/aprove-paycheck-data.component';

const routes: Routes = [
  {path:"", component : CompanyComponent  ,
children : [
  {path : "dashboard" , component : DashboardComponent},
  {path : "dashboard/:leveOne" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour/:levelFive" , component : DashboardComponent},
  {path : "dashboard/:leveOne/:levelTwo/:levelThree/:levelFour/:levelFive/:levelSix" , component : DashboardComponent},
  {path : "hire" , component : HireEmployeeComponent},
  {path : "changeContract/:id" , component : NewContractComponent},
  {path : "employee/:id" , component : EmployeeDetailsComponent,
  children : [
    { path : "information" , component : EmployeeInformationComponent
  },
    { path : "contracts" , component : EmployeeContractsComponent},
    { path : "payslips" , component : EmployeePayslipsComponent}
  ]
},
{path : 'aprove_paychecks' , component : AprovePaycheckDataComponent}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers : [provideRouter(routes , withComponentInputBinding())]
})
export class CompanyRoutingModule { }

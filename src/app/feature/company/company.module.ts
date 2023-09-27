import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { AsideComponent } from './components/aside/aside.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyService } from './services/company.service';
import { HireEmployeeComponent } from './components/hire-employee/hire-employee.component';
import { NewContractComponent } from './components/new-contract/new-contract.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeInformationComponent } from './components/employee-information/employee-information.component';
import { EmployeeContractsComponent } from './components/employee-contracts/employee-contracts.component';
import { EmployeePayslipsComponent } from './components/employee-payslips/employee-payslips.component';
import { AprovePaycheckDataComponent } from './components/aprove-paycheck-data/aprove-paycheck-data.component';


@NgModule({
  declarations: [
    CompanyComponent,
    AsideComponent,
    DashboardComponent,
    HireEmployeeComponent,
    NewContractComponent,
    EmployeeDetailsComponent,
    EmployeeInformationComponent,
    EmployeeContractsComponent,
    EmployeePayslipsComponent,
    AprovePaycheckDataComponent 
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
  ],
  exports : [
    AsideComponent, 
    DashboardComponent
  ],
  providers : [
    CompanyService
  ]
})
export class CompanyModule { }

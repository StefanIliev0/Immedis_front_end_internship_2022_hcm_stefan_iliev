import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyModule } from '../company/company.module';
import { AdminService } from './services/admin.service';


@NgModule({
  declarations: [NewCompanyComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CompanyModule, 
  ],
  providers : [
    AdminService 
  ]
})
export class AdminModule { }

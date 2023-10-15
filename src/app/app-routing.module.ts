import { NgModule } from '@angular/core';
import {  RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { WildComponent } from './core/components/wild/wild.component';

const routes: Routes = [{
  path : '' , redirectTo : "auth/login" , pathMatch : 'full'
},{
  path: 'auth',
  loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
},{
  path: 'admin',
  loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule)
},{
  path: ':company',
  loadChildren: () => import('./feature/company/company.module').then(m => m.CompanyModule)
},{path : "**" , component : WildComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [provideRouter(routes , withComponentInputBinding())]
})
export class AppRoutingModule { }

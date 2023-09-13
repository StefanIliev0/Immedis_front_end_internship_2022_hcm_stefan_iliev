import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './feature/auth/auth.module';
import { CompanyModule } from './feature/company/company.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';


import { ErrReducer } from './store/reducers/err.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ err :  ErrReducer }),
    HttpClientModule,
    CoreModule,
    AuthModule,
    CompanyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

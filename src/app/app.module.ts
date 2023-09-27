import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ErrReducer } from './store/reducers/err.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { companyStructureReducer } from './store/reducers/companyStructure.reducer';
import { PathReducer } from './store/reducers/path.reducer';

import { BackEndService } from './services/back-end.service';
import { authInterseptorProvider } from './interceptors/auth.interseptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ err :  ErrReducer , user : userReducer , struture : companyStructureReducer , path : PathReducer }),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [BackEndService , authInterseptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

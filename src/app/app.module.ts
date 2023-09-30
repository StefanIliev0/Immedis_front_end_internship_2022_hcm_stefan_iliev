import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
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
import { AuthService } from './feature/auth/services/auth.service';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { WildComponent } from './core/components/wild/wild.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent ,
    HeaderComponent,
    FooterComponent,
    WildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ err :  ErrReducer , user : userReducer , struture : companyStructureReducer , path : PathReducer }),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule, 
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [BackEndService , authInterseptorProvider , AuthService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

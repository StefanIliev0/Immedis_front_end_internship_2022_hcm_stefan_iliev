import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { ErrMessageComponent } from './components/err-message/err-message.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';


import { FormService } from './services/form.service';
import { SpinerComponent } from './components/spiner/spiner.component';



@NgModule({
  declarations: [
    ButtonComponent,
    ErrMessageComponent,
    DynamicFormComponent,
    SpinerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports : [
    ButtonComponent, 
    ErrMessageComponent,
    DynamicFormComponent,
    SpinerComponent,
  ],
  providers : [
    FormService
  ]
})
export class SharedModule { }

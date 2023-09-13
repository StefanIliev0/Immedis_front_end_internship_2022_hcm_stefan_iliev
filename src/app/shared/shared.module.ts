import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ErrMessageComponent } from './components/err-message/err-message.component';



@NgModule({
  declarations: [
    ButtonComponent,
    ErrMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

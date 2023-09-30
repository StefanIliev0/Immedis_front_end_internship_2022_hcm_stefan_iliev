import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { DynamicField } from 'src/app/types/DynamicField';

import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges {
@Input()  fromModel! : DynamicField[][]; 
@Output() getFormValue = new EventEmitter();
@Output() onSubmit = new EventEmitter();

fieldGroups : DynamicField[][] = [] ;
form! : FormGroup ;
err : boolean = false;



constructor( private fb : FormBuilder , private service : FormService){

}
submit(){
//if form is valid send information to parent ,else show message ; 
if(this.form.invalid){
  this.err = true;
  setTimeout(()=>{
    this.err = false;
  }, 3000);
  return
}
this.onSubmit.emit(this.form.value); 
}

sendValue(){
  // send changes to parent component ;
  this.getFormValue.emit(this.form.value); 
}

ngOnChanges(changes: SimpleChanges): void {
  // on init and on changes update rendered form and save in variables 
  this.form = this.fb.group(this.service.generateFormGroupObject(this.fromModel));
  this.fieldGroups =  this.service.generateFormTemplate(this.fromModel);
}


}

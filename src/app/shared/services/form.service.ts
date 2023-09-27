import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { DynamicField } from 'src/app/types/DynamicField';

@Injectable()

export class FormService {

  constructor() { }

 generateFormTemplate(formObj : DynamicField[][]) {
  return formObj?.map(x => {
  let fieldsLine =  x?.map( fl => {
  let  {value, validators , ...other } = fl ;
  return other 
  })
  return fieldsLine
  })
 }
 
  generateFormGroupObject(formObj : DynamicField[][]){
  let returnFormObj : any = {}; 
  formObj?.forEach(x => {
    x?.forEach( fl => {
    if(fl.type == "button" || fl.type == "header"){
      return
    }
    if(fl.disabled){
      returnFormObj[fl.controlName|| ''] = {value : fl.value , disabled : true}
    }else{
      returnFormObj[fl.controlName|| ''] = [fl.value];
    }
    
    if(fl.validators){
    let validators : ValidatorFn[] = [];
      fl.validators?.forEach(v => {
        switch(v.type){
          case "required" : 
          validators.push(Validators.required); 
          break ; 
          case "min" : 
          validators.push(Validators.min(Number(v.value))); 
          break ; 
          case "max" : 
          validators.push(Validators.max(Number(v.value))); 
          break ; 
          case "minLength" : 
          validators.push(Validators.minLength(Number(v.value))); 
          break ; 
          case "maxLength" : 
          validators.push(Validators.maxLength(Number(v.value))); 
          break ;  
          case "pattern" : 
          validators.push(Validators.pattern(v.value || "")); 
          break ; 
        }
      })
    
    returnFormObj[fl.controlName || ''].push({validators: Validators.compose(validators), updateOn: "blur"})
    }
    })
    })
  return returnFormObj 
  }




}

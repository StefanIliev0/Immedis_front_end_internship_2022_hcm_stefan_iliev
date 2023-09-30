import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { DynamicField } from 'src/app/types/DynamicField';

@Injectable()

export class FormService {

  constructor() { }

 generateFormTemplate(formObj : DynamicField[][]) {
  // Sanitize array from vlaue and validators ; 
  return formObj?.map(x => {
  let fieldsLine =  x?.map( fl => {
    // destruct object to get needed data.
  let  {value, validators , disabled , ...other } = fl ;
  return other 
  })
  return fieldsLine
  })
 }
  // Make Object that fb accepted
  generateFormGroupObject(formObj : DynamicField[][]){
  let returnFormObj : any = {}; 
  formObj?.forEach(x => {
    x?.forEach( fl => {
  //skip if type is button or header 
    if(fl.type == "button" || fl.type == "header"){
      return
    }
    // if disabled - set it and set value and name 
    if(fl.disabled){
      returnFormObj[fl.controlName|| ''] = {value : fl.value , disabled : true}
    }else{
      returnFormObj[fl.controlName|| ''] = [fl.value];
    }
    // if have validators , structure validators to object by type in validatorsFn[]
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
    // add validator function to object 
    returnFormObj[fl.controlName || ''].push({validators: Validators.compose(validators), updateOn: "blur"})
    }
    })
    })
  // return formated object 
  return returnFormObj 
  }




}

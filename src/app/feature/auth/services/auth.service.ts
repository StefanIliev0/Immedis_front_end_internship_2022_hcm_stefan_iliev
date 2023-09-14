import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrActions } from 'src/app/store/actions/err.actions';
import { Permission } from 'src/app/types/Permission';

import { KEY_API } from 'src/app/constaints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  AUTH_BASIC_URI : string= `${KEY_API}/auth`;

  constructor( private store : Store , private http : HttpClient) { }

  addErr(text : string){
    this.store.dispatch(ErrActions.add({err : text}))
    setTimeout(() => {
      this.store.dispatch(ErrActions.remove())
    },3000)
  }

  loginUser(email : string,  password : string ){
    return this.http.post( `${this.AUTH_BASIC_URI}/login`, {email , password})
  }

  generatePath(permissions : Permission[]){
    let pathString = `${permissions[0].title}/dashboard`; 
    let isDone = false; 


    permissions.forEach(x => {
      if(!isDone && x.title != permissions[0].title){
      pathString += `/${x.title}` ; 
      }
      if( !isDone && !(x.can.menage || x.can.admin || x.can.fill) ){
        isDone = true ; 
      }
    })

  return pathString
  }

}

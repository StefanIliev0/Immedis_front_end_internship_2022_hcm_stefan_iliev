import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrActions } from 'src/app/store/actions/err.actions';
import { Permission } from 'src/app/types/Permission';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  USER_BASIC_URI : string= `123/auth`;

  constructor( private store : Store , private http : HttpClient) { }

  addErr(text : string){
    this.store.dispatch(ErrActions.add({err : text}))
    setTimeout(() => {
      this.store.dispatch(ErrActions.remove())
    },3000)
  }

  loginUser(username : string,  password : string ){
    return this.http.post( `${this.USER_BASIC_URI}/login`, {username , password})
  }

  generatePath(permissions : Permission[]){
    let pathString = ''; 

    permissions.forEach(x => {
      pathString += `/${x.title}` ; 
    })

  return pathString
  }

}

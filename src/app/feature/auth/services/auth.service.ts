import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrActions } from 'src/app/store/actions/err.actions';
import { Permission } from 'src/app/types/Permission';

import { BackEndService } from 'src/app/services/back-end.service';
import { selectIsAuth } from 'src/app/store/selectors/user.selectors';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private store: Store, private backEndService: BackEndService , private router : Router) {}
// add error message to Error store 
  addErr(text: string) {
    this.store.dispatch(ErrActions.add({ err: text }));
    setTimeout(() => {
      this.store.dispatch(ErrActions.remove());
    }, 3000);
  }
  // Send request to server 
  loginUser(email: string, password: string) {
    return this.backEndService.post(`company/login`, { email, password });
  }
    // Send request to server 
  changePassword(userId: string, companyName: string, newPassword: string) {
    return this.backEndService.post(`company/changePassword`, {
      userId,
      newPassword,
      companyName,
    });
  }
  // return base route path based to user permissions 
  generatePath(permissions: Permission[]) {
    let companyName = permissions[0].title.replaceAll(` `, ``);
    let pathString = `${companyName}/dashboard`;
    let isDone = false;
    let isHavePermisions = false;
    permissions.forEach((x) => {
      if (!isDone && x.title != permissions[0].title) {
        pathString += `/${x.title}`;
      }
      if (
        !isDone &&
        (x.can.menage || x.can.admin || x.can.fill || x.can.read)
      ) {
        isDone = true;
      }
      if (x.can.menage || x.can.admin || x.can.fill || x.can.read) {
        isHavePermisions = true;
      }
    });

    return { isHavePermisions, pathString, companyName };
  }
  // return observable from User Store
  isAuth(){
    return  this.store.select(selectIsAuth); 
  }
  // redirect to home 
  navigateTohome(){
    this.router.navigate([`/`]);
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrActions } from 'src/app/store/actions/err.actions';
import { Permission } from 'src/app/types/Permission';

import { KEY_API } from 'src/app/constaints';
import { BackEndService } from 'src/app/services/back-end.service';

@Injectable()
export class AuthService {
  AUTH_BASIC_URI: string = `${KEY_API}/auth`;

  constructor(private store: Store, private backEndService: BackEndService) {}

  addErr(text: string) {
    this.store.dispatch(ErrActions.add({ err: text }));
    setTimeout(() => {
      this.store.dispatch(ErrActions.remove());
    }, 3000);
  }

  loginUser(email: string, password: string) {
    return this.backEndService.post(`auth/login`, { email, password });
  }
  changePassword(userId: string, companyName: string, newPassword: string) {
    return this.backEndService.post(`auth/changePassword`, {
      userId,
      newPassword,
      companyName,
    });
  }
  generatePath(permissions: Permission[]) {
    let companyName = permissions[0].title;
    let pathString = `${companyName}/dashboard`;
    let isDone = false;
    let isHavePermisions = false;
    permissions.forEach((x) => {
      if (!isDone && x.title != permissions[0].title) {
        pathString += `/${x.title}`;
      }
      if (
        !isDone &&
        !(x.can.menage || x.can.admin || x.can.fill || x.can.read)
      ) {
        isDone = true;
      }
      if (x.can.menage || x.can.admin || x.can.fill || x.can.read) {
        isHavePermisions = true;
      }
    });

    return { isHavePermisions, pathString, companyName };
  }
}

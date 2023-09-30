import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../feature/auth/services/auth.service';

export const authGuard: CanActivateFn =  (route, state) => {
  //get if has user from Auth service
  let Auth = inject(AuthService)
  let user =  Auth.isAuth();
   user.subscribe(x => { 
    if(!x){
      //if hasn`t user redirect to login page 
      Auth.navigateTohome();
    }
  }).unsubscribe()


  return user;
};

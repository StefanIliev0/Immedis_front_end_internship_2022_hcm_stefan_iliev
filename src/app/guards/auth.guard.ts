import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../feature/auth/services/auth.service';

export const authGuard: CanActivateFn =  (route, state) => {
  let Auth = inject(AuthService)
  let user =  Auth.isAuth();
   user.subscribe(x => { 
    if(!x){
      Auth.navigateTohome();
    }
  }).unsubscribe()


  return user;
};

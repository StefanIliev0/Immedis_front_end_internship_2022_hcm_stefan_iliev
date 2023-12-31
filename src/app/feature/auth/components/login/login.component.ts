import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UsersActions } from 'src/app/store/actions/user.actions';

import { User } from 'src/app/types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  // set subscriptions 
  subscr$: Subscription = new Subscription();

  constructor(
    private service: AuthService,
    private store: Store<{ user: any }>,
    private router: Router
  ) {}

  async login(form: NgForm) {
    if (form.invalid) {
      // if forms is invalid - show message 
      this.service.addErr("Sorry , but something in your fields isn't right.");
      return;
    }
    // if is valid send request to server
    this.subscr$ = this.service
      .loginUser(form.value['email'], form.value['password'])
      .subscribe((res: any) => {
        const user = res.user as User;
        // add user to Store and generate path to redirect 
        this.store.dispatch(UsersActions.add({ user }));
        const { isHavePermisions, pathString, companyName } =
          this.service.generatePath(user.permissions);
        if (user.isNewEmpl) {
          this.router.navigate([`auth/change_password`]);
          return;
        }
        if (isHavePermisions) {
          this.router.navigate([pathString]);
        } else {
          this.router.navigate([`${companyName}/employee/${user._id}/information`]);
        }
      });
  }
  ngOnDestroy(): void {
    this.subscr$.unsubscribe();
  }
}

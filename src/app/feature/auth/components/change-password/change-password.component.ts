import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  // init subscriptions 
  subscr$: Subscription = new Subscription();
  user$: Subscription = new Subscription();

  companyName: string = '';
  pathString: string = '';
  userId: string = '';
  isHavePermisions: boolean = false;

  constructor(
    private service: AuthService,
    private store: Store<{ user: any }>,
    private router: Router
  ) {}
  ngOnInit(): void {
    // get user 
    this.user$ = this.store.select(selectUser).subscribe((x) => {
      let user = x;
      // set variables via auth service based to permissions of user 
      let { isHavePermisions, pathString, companyName } =
        this.service.generatePath(user.permissions);
      this.isHavePermisions = isHavePermisions;
      this.pathString = pathString;
      this.companyName = companyName;
      this.userId = user._id;
    });
  }
  async changePassword(form: NgForm) {
    if (form.invalid) {
      // if form is invalid set Message 
      this.service.addErr("Sorry , but something in your fields isn't right.");
      return;
    }
    // send new password to server 
    this.subscr$ = this.service
      .changePassword(this.userId, this.companyName, form.value['password'])
      .subscribe((res: any) => {
        // on positive response navigate to correct path
        if (this.isHavePermisions) {
          this.router.navigate([this.pathString]);
        } else {
          this.router.navigate([`${this.companyName}/profile/${this.userId}`]);
        }
      });
  }
  ngOnDestroy(): void {
    // unsubscribe subscriptions 
    this.subscr$.unsubscribe();
    this.user$.unsubscribe();
  }
}

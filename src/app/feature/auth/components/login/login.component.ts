import { Component , OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UsersActions } from 'src/app/store/actions/user.actions';

import { User } from 'src/app/types/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  
  subscr$: Subscription = new Subscription;


  constructor(private service : AuthService , private  store : Store<{user : any}>, private router : Router){
  }
  
  async login(form : NgForm){

    if(form.invalid ){
      this.service.addErr("Sorry , but something in your fields isn't right.");
     return
    }
   
    this.subscr$ =  this.service.loginUser(form.value["username"], form.value["password"]).subscribe( (res) => {
      const user  = res as User;
      this.store.dispatch(UsersActions.add({user}));

      const pathString = this.service.generatePath(user.permissions);

      this.router.navigate([`company${pathString}`]);
      }
    )
  }
  ngOnDestroy(): void {
    this.subscr$.unsubscribe();
  }
}

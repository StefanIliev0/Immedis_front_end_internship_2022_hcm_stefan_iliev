import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  user? : User; 
  company : string = '';
  id : string = '';

  getUserSubs$ : Subscription = new Subscription();

  constructor(private store : Store){}

  ngOnInit(): void {
    this.getUserSubs$ = this.store.select(selectUser).subscribe(x => {
      this.user = x ; 
      if(x.email){
      this.company = this.user.email.split(`@`)[1].split(`.`)[0]; 
      this.id = this.user._id;
    }
    })
  }
  ngOnDestroy(): void {
    this.getUserSubs$.unsubscribe();
  }
}

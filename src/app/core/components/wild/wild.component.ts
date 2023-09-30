import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { companyStructureActions } from 'src/app/store/actions/companyStructure.actions';
import { UsersActions } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-wild',
  templateUrl: './wild.component.html',
  styleUrls: ['./wild.component.css']
})
export class WildComponent {
  constructor(private router : Router, private store : Store){

  }

  navigateToLogin(){
    this.store.dispatch(UsersActions.remove());
    this.store.dispatch(companyStructureActions.remove());
    this.router.navigate([`/`])
  }

}

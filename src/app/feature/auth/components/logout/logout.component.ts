import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { companyStructureActions } from 'src/app/store/actions/companyStructure.actions';
import { UsersActions } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private store : Store , private router : Router){}
  ngOnInit(): void {
      this.store.dispatch(UsersActions.remove());
      this.store.dispatch(companyStructureActions.remove());
      this.router.navigate([`/`]);
  }

}

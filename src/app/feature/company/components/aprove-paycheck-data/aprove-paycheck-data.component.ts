import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aprove-paycheck-data',
  templateUrl: './aprove-paycheck-data.component.html',
  styleUrls: ['./aprove-paycheck-data.component.css']
})
export class AprovePaycheckDataComponent implements OnInit,OnDestroy {
// variable that holds table data 
table : {[key:string] : string}[] = [] ; 
// variable on which the table style depends
cursorPosition = ``;
// gets company name from parent component params 
company: string = this.activeRoute.parent?.snapshot.params['company'] || '';

table$ :Subscription = new Subscription;
submit$ :Subscription = new Subscription;

constructor(private service : CompanyService , private router : Router, private activeRoute : ActivatedRoute){}

ngOnInit(): void {
  //gets tible data from server 
  this.table$ = this.service.getPaychecks(this.company).subscribe(x => {
    this.table = x as {[key:string] : string}[];
  })
}
submit(){
//send approve request to server
this.submit$ = this.service.approvePaychecks(this.company).subscribe( x => {
  this.back(); 
}
)
}
back(){
//navigate to home dashboard page
  this.router.navigate([`${this.company}/dashboard`]);
}
changeCursorPosition ( row : number , pos : number){
// change variable on which the table style depends
this.cursorPosition = `${row}-${pos}`;
}
ngOnDestroy(): void {
  // unsubscribe 
  this.table$.unsubscribe();
  this.submit$.unsubscribe()
}
}

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

table : {[key:string] : string}[] = [] ; 
company: string = this.activeRoute.parent?.snapshot.params['company'] || '';
cursorPosition = ``;

table$ :Subscription = new Subscription;
submit$ :Subscription = new Subscription;

constructor(private service : CompanyService , private router : Router, private activeRoute : ActivatedRoute){}

ngOnInit(): void {
  this.table$ = this.service.getPaychecks(this.company).subscribe(x => {
    this.table = x as {[key:string] : string}[];
    console.log(x)
  })
}
submit(){
this.submit$ = this.service.approvePaychecks(this.company).subscribe( x => {
  this.back(); 
}
)
}
back(){
  this.router.navigate([`${this.company}/dashboard`]);
}
changeCursorPosition ( row : number , pos : number){
this.cursorPosition = `${row}-${pos}`;
}
ngOnDestroy(): void {
  this.table$.unsubscribe();
  this.submit$.unsubscribe()
}
}

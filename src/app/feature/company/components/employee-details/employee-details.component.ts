import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  pathEnd : string = "";
  path :string =""
constructor(private router : Router){

}

ngOnInit(): void {
  this.path = this.router.url.split(`/`).slice(0 , -1).join(`/`); 
  this.pathEnd = this.router.url.split('/').slice(-1)[0]; 
} 

  goTo(path : string){
    this.pathEnd = path;
    this.router.navigate([`${this.path}/${path}`]);
  }
}

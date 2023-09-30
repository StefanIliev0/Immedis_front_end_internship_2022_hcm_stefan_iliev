import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { Payslip } from 'src/app/types/Payslip';


@Component({
  selector: 'app-employee-payslips',
  templateUrl: './employee-payslips.component.html',
  styleUrls: ['./employee-payslips.component.css']
})
export class EmployeePayslipsComponent implements OnInit , OnDestroy {

  constructor(
    private activeRoute: ActivatedRoute,
    private service: EmployeeService,
    private router: Router
  ) {};

  id: string = this.activeRoute.parent?.snapshot.params['id'] || '';
  companyName = this.router.url.split(`/`)[1];
  index: number = 0;
  maxIndex: number = 0;
  payslip? : Payslip ; 
  isHavePermisions : boolean = false; 
  routeData$: Subscription = new Subscription();

  changeIndex(type: string) {
    if (type == 'negative') {
      this.index -= 1;
    } else {
      this.index += 1;
    }
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.routeData$.unsubscribe();
  }
  getData() {
    this.routeData$ = this.service
      .getEmplPayslip(this.id, this.companyName, this.index)
      .subscribe((x) => {
        let { emplPayslip, isHavePermisions, maxPayslips } = x as {
          emplPayslip: Payslip ,
          isHavePermisions: boolean,
          maxPayslips: number,
        };
        this.payslip = emplPayslip;
        this.isHavePermisions = isHavePermisions;
        this.maxIndex = maxPayslips - 1;
      });
  }
}
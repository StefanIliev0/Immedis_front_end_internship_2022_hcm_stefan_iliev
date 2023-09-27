import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';


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
  curEmpl: any;
  routeData: { [key: string]: string } = {};
  index: number = 0;
  maxIndex: number = 0;

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
        console.log(x)
        // let { emplPayslip, isHavePermisions, maxPayslips } = x as {
        //   emplContract: { [key: string]: string };
        //   isHavePermisions: string;
        //   maxContract: number;
        // };
        // this.routeData = emplContract;
        // this.canManage = isHavePermisions;
        // this.maxIndex = maxContract - 1;
        // this.form = this.service.generateContractForm(
        //   this.routeData,
        //   this.canManage,
        //   this.index
        // );
      });
  }
}


// {
//   "emplPayslip": {
//       "overtimeHours": {
//           "num": "10",
//           "hour": "85.23579545454545",
//           "total": "852.3579545454545"
//       },
//       "overtimeHolydaysHour": {
//           "num": "30",
//           "hour": "113.64772727272727",
//           "total": "3409.431818181818"
//       },
//       "unpaidHours": {
//           "num": "0",
//           "hour": "56.82386363636363",
//           "total": "0"
//       },
//       "bonus": {
//           "persents": "5",
//           "total": "500.05"
//       },
//       "sickLeaveDays": {
//           "num": "0",
//           "days": "454.59090909090907",
//           "total": "0"
//       },
//       "anualLeaveDays": {
//           "num": "0",
//           "days": "454.59090909090907",
//           "total": "0"
//       },
//       "childBenefits": {
//           "num": "3",
//           "perOne": "40",
//           "total": "120"
//       },
//       "taxes": {
//           "taxesForEmp": {
//               "incomeTax": "744.1419886363636",
//               "SSC": "446.48519318181815",
//               "at": "1190.6271818181817"
//           },
//           "taxesForEmpr": {
//               "incomeTax": "446.48519318181815",
//               "SSC": "297.65679545454543",
//               "at": "297.65679545454543"
//           }
//       },
//       "paymantDay": "1-8-2023",
//       "month": "7",
//       "year": "2023",
//       "GrossPaytoEmpl": "14882.839772727271",
//       "netPaytoEmpl": "12501.585409090909",
//       "totalPay": "15924.638556818181",
//       "_id": "65145e43e7286e4cb96aaa48",
//       "name": "Ivan Ivanov Ivanov",
//       "position": "CEO"
//   },
//   "isHavePermisions": true,
//   "maxPayslips": 1
// }
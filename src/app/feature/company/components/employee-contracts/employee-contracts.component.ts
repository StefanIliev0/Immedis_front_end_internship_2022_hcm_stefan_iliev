import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicField } from 'src/app/types/DynamicField';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-employee-contracts',
  templateUrl: './employee-contracts.component.html',
  styleUrls: ['./employee-contracts.component.css'],
})
export class EmployeeContractsComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private service: EmployeeService,
    private formService : FormGeneratorService ,
    private router: Router
  ) {}

  id: string = this.activeRoute.parent?.snapshot.params['id'] || '';
  companyName = this.router.url.split(`/`)[1];
  curEmpl: any;
  form: DynamicField[][] = [];
  formValues: { [key: string]: string } = {};
  canManage: string = '';
  edit: boolean = false;
  routeData: { [key: string]: string } = {};
  index: number = 0;
  maxIndex: number = 0;

  routeData$: Subscription = new Subscription();
  req$: Subscription = new Subscription();

  changeIndex(type: string) {
    if (type == 'negative') {
      this.index -= 1;
    } else {
      this.index += 1;
    }
    this.getData();
  }
  setEdit() {
    this.edit = true;
    this.form = this.formService.generateEditContractForm(this.routeData);
  }
  updateData(formData: { [key: string]: string }) {
    this.edit = false;
    this.req$ = this.service
      .editEmplContract(formData, this.id, this.companyName)
      .subscribe((x) => {
        this.form = this.formService.generateContractForm(
          { ...this.routeData, ...formData },
          this.canManage,
          this.index
        );
      });
  }
  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.routeData$.unsubscribe();
    this.req$.unsubscribe();
  }
  getData() {
    this.routeData$ = this.service
      .getEmplContract(this.id, this.companyName, this.index)
      .subscribe((x) => {
        let { emplContract, isHavePermisions, maxContract } = x as {
          emplContract: { [key: string]: string };
          isHavePermisions: string;
          maxContract: number;
        };
        this.routeData = emplContract;
        this.canManage = isHavePermisions;
        this.maxIndex = maxContract - 1;
        this.form = this.formService.generateContractForm(
          this.routeData,
          this.canManage,
          this.index
        );
      });
  }
}

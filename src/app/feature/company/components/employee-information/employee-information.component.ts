import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicField } from 'src/app/types/DynamicField';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css'],
})
export class EmployeeInformationComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private service: EmployeeService,
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

  routeData$: Subscription = new Subscription();
  req$: Subscription = new Subscription();
  setEdit() {
    this.edit = true;
    this.form = this.service.generateEditInfoForm(this.routeData);
  }
  updateData(formData: { [key: string]: string }) {
    this.edit = false;
    this.req$ = this.service
      .editEmplInfo(formData, this.id, this.companyName)
      .subscribe((x) => {
        this.form = this.service.generateInformationForm(
          { ...this.routeData, ...formData },
          this.canManage
        );
      });
  }
  ngOnInit(): void {
    this.routeData$ = this.service
      .getInformationAboutEmpl(this.id, this.companyName)
      .subscribe((x) => {
        let { emplInfo, isHavePermisions } = x as {
          emplInfo: { [key: string]: string };
          isHavePermisions: string;
        };
        this.routeData = emplInfo;
        this.canManage = isHavePermisions;
        this.form = this.service.generateInformationForm(
          this.routeData,
          this.canManage
        );
      });
  }
  ngOnDestroy(): void {
    this.routeData$.unsubscribe();
    this.req$.unsubscribe();
  }
}

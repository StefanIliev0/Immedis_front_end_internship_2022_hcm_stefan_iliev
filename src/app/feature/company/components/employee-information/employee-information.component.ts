import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicField } from 'src/app/types/DynamicField';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css'],
})
export class EmployeeInformationComponent implements OnInit, OnDestroy {

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

  
  constructor(
    private activeRoute: ActivatedRoute,
    private service: EmployeeService,
    private formService : FormGeneratorService, 
    private router: Router
  ) {}

    // get data from server 
  ngOnInit(): void {
    this.routeData$ = this.service
      .getInformationAboutEmpl(this.id, this.companyName)
      .subscribe((x) => {
        let { emplInfo, isHavePermisions } = x as {
          emplInfo: { [key: string]: string };
          isHavePermisions: string;
        };
        // sets base variables 
        this.routeData = emplInfo;
        this.canManage = isHavePermisions;

        this.form = this.formService.generateInformationForm(
          this.routeData,
          this.canManage
        );
      });
  }
// rerender form with allowed to change fields 
  setEdit() {
    this.edit = true;
    this.form = this.formService.generateEditInfoForm(this.routeData);
  }
  // send to server updated data and stop editing 
  updateData(formData: { [key: string]: string }) {
    this.edit = false;
    this.req$ = this.service
      .editEmplInfo(formData, this.id, this.companyName)
      .subscribe((x) => {
        this.form = this.formService.generateInformationForm(
          { ...this.routeData, ...formData },
          this.canManage
        );
      });
  }
  ngOnDestroy(): void {
    this.routeData$.unsubscribe();
    this.req$.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectPath } from 'src/app/store/selectors/path.selector';
import { DynamicField } from 'src/app/types/DynamicField';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { ErrActions } from 'src/app/store/actions/err.actions';
import { FormGeneratorService } from '../../services/form-generator.service';

export type basicFormValues = {
  [key: string]: string;
};

@Component({
  selector: 'app-hire-employee',
  templateUrl: './hire-employee.component.html',
  styleUrls: ['./hire-employee.component.css'],
})
export class HireEmployeeComponent implements OnInit, OnDestroy {
  form?: DynamicField[][];
  formValues: basicFormValues = {};
  path: string[] = [];
  ready: boolean = false ; 

  path$: Subscription = new Subscription();
  form$: Subscription = new Subscription();
  addEmpl$: Subscription = new Subscription();

  constructor(
    private store: Store,
    private service: CompanyService,
    private formService : FormGeneratorService,
    private router: Router
  ) {}

  setNewEmplForm(path: string[]) {
    this.form$ = this.service.getPositions(path).subscribe((x) => {
      let valuesFromBE = x as { [key: string]: string };
      this.form = this.formService.formatNewHireForm(valuesFromBE);
    });
  }
  getFormValue(forms: basicFormValues) {
    this.formValues = forms;
  }
  sendEmpl() {
    this.addEmpl$ = this.service
      .addEmpl(this.path, this.formValues)
      .subscribe((x) => {
        let data = x as {email : string}
        this.store.dispatch(ErrActions.add({err : data.email}));
        this.ready = true; 

      });
  };
  isReady(){
        let company = this.path[0];
        let otherLevels = this.path.slice(1).join(`/`);
        this.router.navigate([`${company}/dashboard/${otherLevels}`]);
  }
  ngOnInit(): void {
    this.path$ = this.store.select(selectPath).subscribe((y) => {
      this.path = y;
      this.setNewEmplForm(y);
    });
  }
  ngOnDestroy(): void {
    this.path$.unsubscribe();
    this.form$.unsubscribe();
  }
}

import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { selectPath } from 'src/app/store/selectors/path.selector';
import { Subscription } from 'rxjs';
import { DynamicField } from 'src/app/types/DynamicField';
import { basicFormValues } from '../hire-employee/hire-employee.component';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css'],
})
export class NewContractComponent implements OnInit, OnDestroy {
  // URI params as Input@
  @Input() id = '';

  path$: Subscription = new Subscription();
  form$: Subscription = new Subscription();
  newContract$: Subscription = new Subscription();

  formValues: { [key: string]: string } = {};

  form: DynamicField[][] = [];
  path: string[] = [];
  newPath: string[] = [];

  constructor(
    private store: Store,
    private service: CompanyService,
    private formService : FormGeneratorService ,
    private router: Router
  ) {}
  // subscribe to path from store 
  ngOnInit(): void {
    this.path$ = this.store.select(selectPath).subscribe((y) => {
      // on path change update form 
      this.path = y;
      this.setNewContractForm(y);
    });
  }
  // gets posible positions and substructures from server and update form 
  setNewContractForm(path: string[]) {
    this.form$ = this.service.getContractData(path, this.id).subscribe((x) => {
      let valuesFromBE = x as {
        [key: string]: string | { [key: string]: string };
      };
      this.form = this.formService.formatNewContractForm(valuesFromBE, path);
      this.form.forEach((x) => {
        x.forEach((y) => {
          if (y.controlName) {
            this.formValues[y.controlName] = y?.value as string;
          }
        });
      });
    });
  }
  // on form value change update form object in corect format 
  getFormValue(forms: basicFormValues) {
    let newArr: string[] = [this.path[0]];
    let isDone = false;
    Object.keys(forms).forEach((x) => {
      if (!isDone && x.startsWith(`level`)) {
        if (forms[x]) {
          newArr.push(forms[x]);
        }
        if (forms[x] != this.formValues[x]) {
          isDone = true;
        }
      }
    });
    // on changes level hierarchy update posible position and structures.
    if (
      newArr.length != this.newPath.length ||
      newArr[newArr.length - 1] != this.newPath[this.newPath.length - 1]
    ) {
      this.form$ = this.service
        .getContractData(newArr, this.id)
        .subscribe((x) => {
          let valuesFromBE = x as {
            [key: string]: string | { [key: string]: string };
          };
          this.form = this.formService.formatNewContractForm(valuesFromBE, newArr);
          this.form.forEach((x) => {
            x.forEach((y) => {
              if (y.controlName) {
                this.formValues[y.controlName] = y?.value as string;
              }
            });
          });
        });
    }
    this.newPath = newArr;
    this.formValues = forms;
  }
  // Send new contract to server
  sendContract() {
    this.newContract$ = this.service
      .newContract(this.newPath, this.id, this.formValues)
      .subscribe((x) => {
        let company = this.newPath[0];
        let otherLevels = this.newPath.slice(1).join(`/`);
        this.router.navigate([`${company}/dashboard/${otherLevels}`]);
      });
  }
  // unsubsribe 
  ngOnDestroy(): void {
    this.path$.unsubscribe();
    this.form$.unsubscribe();
    this.newContract$.unsubscribe();
  };
}

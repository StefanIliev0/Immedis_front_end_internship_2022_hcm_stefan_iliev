import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { TableObject } from 'src/app/types/tableObject';
import { Store } from '@ngrx/store';
import { selectPath } from 'src/app/store/selectors/path.selector';
import { PathActions } from 'src/app/store/actions/path.actions';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { Permission } from 'src/app/types/Permission';
import { DynamicField } from 'src/app/types/DynamicField';
import { DropDownAnimation } from '../../animations/dropDownAnimation';

type payCheck = {
  overtimeHours: string;
  overtimeHolydaysHour: string;
  unpaidHours: string;
  bonus: string;
  sickLeaveDays: string;
  anualLeaveDays: string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [DropDownAnimation],
})
export class DashboardComponent implements OnInit, OnDestroy, OnChanges {
  @Input(`leveOne`) l1: string = '';
  @Input(`levelTwo`) l2: string = '';
  @Input(`levelThree`) l3: string = '';
  @Input(`levelFour`) l4: string = '';
  @Input(`levelFive`) l5: string = '';
  @Input(`levelSix`) l6: string = '';

  company: string = this.activeRoute.parent?.snapshot.params['company'] || '';

  progess = 0;
  table?: TableObject;
  showEmpOptions: { [key: number]: boolean } = {};
  showTableObject: { [key: number]: boolean } = {};
  showReleaseObject: { [key: number]: boolean } = {};
  tableForm: DynamicField[][] = [];
  formValues: { [key: string]: string } = {};

  pathArr: string[] = [
    this.company,
    this.l1,
    this.l2,
    this.l3,
    this.l4,
    this.l5,
    this.l6,
  ].filter((x) => x != '' && x != undefined);
  permissionsArr: Permission[] = [];
  permission: { [key: string]: boolean } = {
    read: false,
    fill: false,
    menage: false,
    admin: false,
  };

  tableSubs$: Subscription = new Subscription();
  path$: Subscription = new Subscription();
  bakcEndSubscription$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: CompanyService,
    private store: Store
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    this.showReleaseObject = {};
    this.showTableObject = {};
    this.pathArr = [
      this.company,
      this.l1,
      this.l2,
      this.l3,
      this.l4,
      this.l5,
      this.l6,
    ].filter((x) => x != '' && x != undefined);
    this.store.dispatch(PathActions.add({ path: this.pathArr }));
    this.permissionsArr = (
      await firstValueFrom(this.store.select(selectUser))
    )?.permissions;
    this.permission = this.service.getUserPerm(
      this.pathArr,
      this.permissionsArr
    );
  }

  ngOnInit() {
    this.path$ = this.store.select(selectPath).subscribe((y) => {
      this.setTable(y);
    });
  }
  showFillTable(index: number, tableData: { [key: string]: string }) {
    this.showReleaseObject = {};
    if (this.showTableObject[index]) {
      this.showTableObject = {};
    } else {
      this.showTableObject = {};
      this.showTableObject[index] = true;
    }
    this.tableForm = this.service.generateFillTable(tableData);
    this.showEmpOptions = {};
  }
  showReleseForm(index: number, endDate: string, name: string) {
    this.showTableObject = {};
    if (this.showReleaseObject[index]) {
      this.showReleaseObject = {};
    } else {
      this.showReleaseObject = {};
      this.showReleaseObject[index] = true;
    }
    this.tableForm = this.service.generateReleseForm(endDate, name);
  }
  ShowDetails(id: string) {
    this.router.navigate([`${this.company}/employee/${id}/information`]);
  };
  AprovePaychecks(){
    this.router.navigate([`${this.company}/aprove_paychecks`]);
  }
  changePosition(id: string) {
    this.router.navigate([this.company + '/changeContract/' + id]);
  }
  hire() {
    this.router.navigate([this.company + '/hire']);
  }
  setTable(y: string[]) {
    this.table = undefined ; 
    this.tableSubs$ = this.service.getTableData(y).subscribe((x) => {
      this.table = x as TableObject;
      if (this.table.substructures.length > 0) {
        let names = this.table.substructures.map((x) => x.name);
        this.service.setSetSubstrNames(names);
      } else {
        this.service.setSetSubstrNames([]);
      }
    });
  }
  navigate(subst: string) {
    this.router.navigate([
      this.router.url.replaceAll(`%20`, ' ') + '/' + subst,
    ]);
  }
  submitPaycheck(index: number, emplId: string) {
    let empl = this.table?.employes.find((x) => x.id == emplId);
    if (empl && Object.keys(this.formValues).length == 6) {
      empl[`lastPayCheck`] = this.formValues as payCheck;
      this.bakcEndSubscription$ = this.service
        .addPaycheck(this.pathArr, emplId, this.formValues)
        .subscribe((x) => {});
      this.showTableObject = {};
    }
  }
  submitReleseForm(id: string) {
    let endDate = this.formValues[`endDate`]; 
    this.bakcEndSubscription$ = this.service
      .releseEmpl(this.pathArr, id, endDate)
      .subscribe((x) => { 
        let empl = this.table?.employes.find((x) => x.id == id);
        if(empl){
        empl['endDate'] = endDate ; }
      });
  }
  ngOnDestroy(): void {
    this.tableSubs$.unsubscribe();
    this.path$.unsubscribe();
    this.bakcEndSubscription$.unsubscribe();
  }
}

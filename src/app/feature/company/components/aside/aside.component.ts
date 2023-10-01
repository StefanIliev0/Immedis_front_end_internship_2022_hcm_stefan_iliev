import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { selectUser } from 'src/app/store/selectors/user.selectors';
import { selectPath } from 'src/app/store/selectors/path.selector';
import { selectStructure } from 'src/app/store/selectors/companyStructure.selector';

import { DropDownAnimation } from '../../animations/dropDownAnimation';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  animations: [DropDownAnimation],
})
export class AsideComponent implements OnInit, OnDestroy {
  // variable that contains the user's current location
  path: string[][] = [];
  // starts position in commpany structure on user 
  startArr: string[][] = [];
  newPath: string[] = [];
  // variable that holds if user have permisions on the end position of start route
  isHavePermissions : boolean = false; 
  // variable that shows which cell is extendet 
  extend: { [key: number]: boolean } = {};

  subPath$: Subscription = new Subscription();
  path$: Subscription = new Subscription();
  permissions$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private service: CompanyService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.permissions$ = this.store.select(selectUser).subscribe((y) => {
      // set base variables
      let {start , permissions } = this.service.generatePathArr(y.permissions);
      this.startArr = start ; 
      this.isHavePermissions = permissions
    });
    this.path$ = this.store.select(selectPath).subscribe((y) => {
      // subscribe to store and holds path in variable 
      this.newPath = y;
    });
    // sets start path to path variable 
    this.path = JSON.parse(JSON.stringify(this.startArr));

    this.subPath$ = this.store.select(selectStructure).subscribe((res) => {
      // gets data for optional paths from store and formate new path depending on the similarities and differences with the old path 
      if (res.length > 0) {
        let newRes = JSON.parse(JSON.stringify(res));
        newRes.push(`Select`);

        if (this.newPath.length > this.path.length) {
          this.path.push(newRes);
        } else {
          let newArr: string[][] = [];
          this.newPath?.forEach((x, i) => {
            let isFinish = false;

            if (!isFinish) {
              let route: string[] = JSON.parse(JSON.stringify(this.path[i]));
              let containte = false;
              if (route.find((z) => z == x)) {
                route[route.length - 1] = x;
                containte = true;
              }
              if (containte) {
                newArr.push(route);
              } else {
                newArr.push([x]);
                isFinish = true;
              }
            }
          });
          newArr.push(newRes);
          this.path = newArr;
        }
      }
      if (res.length == 0 && this.path.length !== this.startArr.length) {
        let newArr: string[][] = [];
        this.newPath?.forEach((x, i) => {
          let isFinish = false;

          if (!isFinish) {
            let route: string[] = JSON.parse(JSON.stringify(this.path[i]));
            let containte = false;
            if (route.find((z) => z == x)) {
              route[route.length - 1] = x;
              containte = true;
            }
            if (containte) {
              newArr.push(route);
            } else {
              newArr.push([x]);
              isFinish = true;
            }
          }
        });
        this.path = newArr;
      }
    });
  }
// redidect to new route 
  navigate(newRoute: string, index: number) {
    // gets company name
    let company = this.path[0][0];
    let newRouteString = company + `/dashboard`;
    if (index == 0) {
      this.extend = [];
      // if navigated index equals to zero navigate to main dashboard page 
      this.router.navigate([newRouteString]);
      return;
    }
    // gets new path with length depends to levels nubmer 
    let levels = this.newPath.slice(1, index);
    
    if (levels.length > 0) {
      // add other routes to string path 
      newRouteString = newRouteString + `/` + levels.join(`/`);
    }
    // add new route 
    newRouteString = newRouteString + `/` + newRoute;
    this.router.navigate([newRouteString]);
    // clear extend variable and add new route to the end of path arr 
    this.extend = [];
    this.path[index][this.path[index].length - 1] = newRoute;
  }
  // shows only diferent substructuries from main path 
  filterName(names: string[], fileredName: string) {
    let newNames = names.filter((x) => x != fileredName);
    return newNames;
  }

  ngOnDestroy(): void {
    this.subPath$.unsubscribe();
    this.path$.unsubscribe();
    this.permissions$.unsubscribe();
  }
}

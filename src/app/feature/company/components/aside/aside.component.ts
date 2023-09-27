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
  path: string[][] = [];
  startArr: string[][] = [];
  newPath: string[] = [];

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
      this.startArr = this.service.generatePathArr(y.permissions);
    });
    this.path$ = this.store.select(selectPath).subscribe((y) => {
      this.newPath = y;
    });

    this.path = JSON.parse(JSON.stringify(this.startArr));

    this.subPath$ = this.store.select(selectStructure).subscribe((res) => {
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
  ngOnDestroy(): void {
    this.subPath$.unsubscribe();
    this.path$.unsubscribe();
    this.permissions$.unsubscribe();
  }

  navigate(newRoute: string, index: number) {
    let company = this.path[0][0];
    let newRouteString = company + `/dashboard`;
    if (index == 0) {
      this.extend = [];
      this.router.navigate([newRouteString]);
      return;
    }
    let levels = this.newPath.slice(1, index);
    if (levels.length > 0) {
      newRouteString = newRouteString + `/` + levels.join(`/`);
    }
    newRouteString = newRouteString + `/` + newRoute;
    this.router.navigate([newRouteString]);
    this.extend = [];
    this.path[index][this.path[index].length - 1] = newRoute;
  }
  filterName(names: string[], fileredName: string) {
    let newNames = names.filter((x) => x != fileredName);
    return newNames;
  }
}

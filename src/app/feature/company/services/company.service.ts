import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BackEndService } from 'src/app/services/back-end.service';
import { companyStructureActions } from 'src/app/store/actions/companyStructure.actions';
import { CompanySubstructure } from 'src/app/types/CompanyStruture';
import { Permission } from 'src/app/types/Permission';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private backend: BackEndService, private store: Store) {}

  getTableData(y: string[]) {
    return this.backend.get('company/dashboard', y);
  }
  setSetSubstrNames(names: CompanySubstructure) {
    this.store.dispatch(companyStructureActions.add({ structure: names }));
  }
  generatePathArr(permissions: Permission[]) {
    let permArr: string[][] = [];
    let isDone = false;

    permissions?.forEach((x) => {
      if (!isDone) {
        permArr.push([x.title]);
      }
      if (
        !isDone &&
        (x.can.menage || x.can.admin || x.can.fill || x.can.read)
      ) {
        isDone = true;
      }
    });

    return{start :permArr  , permissions: isDone};
  }
  getPaychecks(companyName : string){
    return this.backend.get(`company/getPaychecks/${companyName}`);
  };
  approvePaychecks(companyName : string){
    return this.backend.post(`company/approvePaychecks` , {name : companyName});
  }
  getUserPerm(path: string[], userPermisions: Permission[]) {
    let permission: { [key: string]: boolean } = {
      read: false,
      fill: false,
      menage: false,
      admin: false,
    };
    path?.forEach((x, i) => {
      if (x.replaceAll(` `, ``) == userPermisions[i]?.title.replaceAll(` `, ``)) {
        permission = userPermisions[i].can;
      }
    });
    return permission;
  }
  addPaycheck(path: string[], id: string, form: { [kay: string]: string }) {
    return this.backend.post(`company/addPaycheck/${id}`, form, path);
  }
  releseEmpl(path: string[], id: string, endDate: string) {
  return this.backend.post(`company/releseEmpl/${id}`,{ endDate : endDate}, path);
  }
  getPositions(path: string[]) {
    return this.backend.get('company/newHire', path);
  }
  getContractData(path: string[], emplID: string) {
    return this.backend.get(`company/newContract/${emplID}`, path);
  }

  addEmpl(path: string[], formData: { [key: string]: string }) {
    return this.backend.post('company/newHire', formData, path);
  }
  newContract(path: string[], id: string, formData: { [key: string]: string }) {
    return this.backend.post(`company/newContract/${id}`, formData, path);
  }


 

}

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
//  makes request to server for getting structure data
  getTableData(y: string[]) {
    return this.backend.get('company/dashboard', y);
  }
  // sets substructuries in Store
  setSetSubstrNames(names: CompanySubstructure) {
    this.store.dispatch(companyStructureActions.add({ structure: names }));
  }
  // generate path array from users permissions
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

    return{start : permArr  , permissions: isDone};
  }
  //makes request to server for getting paychecks data
  getPaychecks(companyName : string){
    return this.backend.get(`company/getPaychecks/${companyName}`);
  };
  // makes request to server for approving paychecks data.
  approvePaychecks(companyName : string){
    return this.backend.post(`company/approvePaychecks` , {name : companyName});
  }
  // checks what permissions the user has on the corresponding structure.
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
  // makes request to server for update paycheck data to employee contract
  addPaycheck(path: string[], id: string, form: { [kay: string]: string }) {
    return this.backend.post(`company/addPaycheck/${id}`, form, path);
  }
  // makes request to server for update end date string to employee contract. 
  releseEmpl(path: string[], id: string, endDate: string) {
  return this.backend.post(`company/releseEmpl/${id}`,{ endDate : endDate}, path);
  }
  // makes request to server for getting available positions in current structure .
  getPositions(path: string[]) {
    return this.backend.get('company/newHire', path);
  }
  // makes request to server for getting available positions and substructures in current structure .
  getContractData(path: string[], emplID: string) {
    return this.backend.get(`company/newContract/${emplID}`, path);
  }
  // makes request to server for adding new employee to company 
  addEmpl(path: string[], formData: { [key: string]: string }) {
    return this.backend.post('company/newHire', formData, path);
  }
  // makes request to server for adding new contract to company and employee 
  newContract(path: string[], id: string, formData: { [key: string]: string }) {
    return this.backend.post(`company/newContract/${id}`, formData, path);
  }

}

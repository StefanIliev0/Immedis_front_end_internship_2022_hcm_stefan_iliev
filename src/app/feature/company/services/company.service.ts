import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BackEndService } from 'src/app/services/back-end.service';
import { companyStructureActions } from 'src/app/store/actions/companyStructure.actions';
import { CompanySubstructure } from 'src/app/types/CompanyStruture';
import { DynamicField } from 'src/app/types/DynamicField';
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
        isDone &&
        (!x.can.menage || !x.can.admin || !x.can.fill || x.can.read)
      ) {
        isDone = true;
      }
    });

    return permArr;
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
      if (x == userPermisions[i]?.title) {
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
  generateFillTable(tableData: { [key: string]: string }) {
    let formFields: DynamicField[][] = [
      [
        {
          label: 'Overtime in hours:',
          id: 'overtimeHours',
          type: 'input',
          kind: 'number',
          controlName: `overtimeHours`,
          value: tableData[`overtimeHours`],
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
        {
          label: 'Holidays overtime  in hours ',
          id: 'overtimeHolydaysHour',
          type: 'input',
          kind: 'number',
          controlName: `overtimeHolydaysHour`,
          value: tableData[`overtimeHolydaysHour`],
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: 'Unpaid hours:',
          id: 'unpaidHours',
          type: 'input',
          kind: 'number',
          controlName: `unpaidHours`,
          value: tableData[`unpaidHours`],
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
        {
          label: 'Bonus in percents : ',
          id: 'bonus',
          type: 'input',
          kind: 'number',
          controlName: `bonus`,
          value: tableData[`bonus`],
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: 'Sick leave in days :',
          id: 'sickLeaveDays',
          type: 'input',
          kind: 'number',
          controlName: `sickLeaveDays`,
          value: tableData[`sickLeaveDays`],
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
        {
          label: 'Annual leave in days : ',
          id: 'anualLeaveDays',
          type: 'input',
          kind: 'number',
          controlName: `anualLeaveDays`,
          value: tableData[`anualLeaveDays`],
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: 'Submit',
          type: 'button',
        },
      ],
    ];
    return formFields;
  }
  generateReleseForm(endDate: string, name: string) {
    let formFields: DynamicField[][] = [
      [
        {
          label: `Termination of the contract of ${name}`,
          id: 'releseheader',
          type: 'header',
        },
      ],
      [
        {
          label: 'From date : ',
          id: 'endDate',
          type: 'input',
          kind: 'date',
          controlName: `endDate`,
          value: endDate,
        },
      ],
      [
        {
          label: 'Relese',
          type: 'button',
        },
      ],
    ];

    return formFields;
  }
  formatNewHireForm(values: { [key: string]: string }) {
    const newFormHire: DynamicField[][] = [
      [
        {
          label: 'Hire new employee in ',
          id: 'hirein',
          type: 'input',
          disabled: true,
          controlName: `company`,
          value: values[`company`],
        },
        {
          label: 'on position',
          id: 'position',
          type: 'select',
          controlName: `position`,
          value: values[`position0`],
          options: [],
        },
      ],
      [
        {
          label: 'Contract information.',
          id: 'contractINfo',
          type: 'header',
        },
      ],
      [
        {
          label: 'Start date : ',
          id: 'startDate',
          type: 'input',
          kind: 'date',
          controlName: `startDate`,
          value: '',
          validators: [{ type: `required` }],
        },
        {
          label: 'End date :',
          id: 'endDate',
          type: 'input',
          kind: 'date',
          controlName: `endDate`,
          value: '',
        },
      ],
      [
        {
          label: 'Base salary in USD : ',
          id: 'grossSalary',
          type: 'input',
          kind: 'number',
          controlName: `grossSalary`,
          value: '0',
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: 'Employee information',
          id: 'emplINfo',
          type: 'header',
        },
      ],
      [
        {
          label: 'Names : ',
          id: 'emplNames',
          type: 'input',
          controlName: `emplNames`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
      ],
      [
        {
          label: 'National ID : ',
          id: 'nationalId',
          type: 'input',
          controlName: `nationalId`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
        {
          label: 'Age : ',
          id: 'age',
          type: 'input',
          kind: 'number',
          controlName: `age`,
          value: '18',
          validators: [{ type: `required` }, { type: `min`, value: '18' }],
        },
        {
          label: 'Family status ',
          id: 'familyStatus',
          type: 'select',
          controlName: `familyStatus`,
          value: '',
          options: [
            { label: 'Married', value: 'Married' },
            { label: 'Single', value: 'Single' },
            { label: 'Other', value: 'Other' },
          ],
        },
      ],
      [
        {
          label: 'Birth date : ',
          id: 'birthDate',
          type: 'input',
          kind: 'date',
          controlName: `birthDate`,
          value: '',
          validators: [{ type: `required` }],
        },
        {
          label: 'Gender ',
          id: 'gender',
          type: 'select',
          controlName: `gender`,
          value: '',
          options: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ],
        },
        {
          label: 'Children ',
          id: 'children',
          type: 'select',
          controlName: `children`,
          value: '0',
          options: [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
          ],
        },
      ],
      [
        {
          label: 'Address : ',
          id: 'emplAdress',
          type: 'input',
          controlName: `emplAdress`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
      ],
      [
        {
          label: 'Employee Bank information',
          id: 'bankInfo',
          type: 'header',
        },
      ],
      [
        {
          label: 'Bank name : ',
          id: 'bankName',
          type: 'input',
          controlName: `bankName`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
      ],
      [
        {
          label: 'IBAN : ',
          id: 'iban',
          type: 'input',
          controlName: `iban`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '7' }],
        },
      ],
      [
        {
          label: 'Finish',
          type: 'button',
        },
      ],
    ];

    Object.keys(values).forEach((x) => {
      if (x.startsWith(`position`)) {
        newFormHire[0][1].options?.push({ value: values[x], label: values[x] });
      }
    });

    return newFormHire;
  }
  formatNewContractForm(
    values: { [key: string]: string | { [key: string]: string } },
    path: string[]
  ) {
    const newFormContract: DynamicField[][] = [
      [
        {
          label: 'Add new contract in ',
          id: 'hirein',
          type: 'input',
          disabled: true,
          controlName: `company`,
          value: values[`company`] as string,
        },
        {
          label: 'for',
          id: 'EmplName',
          type: 'input',
          disabled: true,
          controlName: `EmplName`,
          value: values[`EmplName`] as string,
        },
      ],
      [],
      [
        {
          label: 'Start date : ',
          id: 'startDate',
          type: 'input',
          kind: 'date',
          controlName: `startDate`,
          value: '',
          validators: [{ type: `required` }],
        },
        {
          label: 'End date :',
          id: 'endDate',
          type: 'input',
          kind: 'date',
          controlName: `endDate`,
          value: '',
        },
      ],
      [
        {
          label: 'Base salary in USD : ',
          id: 'grossSalary',
          type: 'input',
          kind: 'number',
          controlName: `grossSalary`,
          value: values['grossSalary'] as string,
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: 'Finish',
          type: 'button',
        },
      ],
    ];
    let positionSelect: DynamicField = {
      label: 'Position',
      id: 'position',
      type: 'select',
      controlName: `position`,
      value: '',
      options: [],
    };
    let subLevelsSelect: DynamicField = {
      label: 'SubLevels',
      id: 'sublevel',
      type: 'select',
      controlName: `levelSUB`,
      value: '',
      options: [],
    };

    let level = 1;
    Object.keys(values).forEach((x) => {
      if (x.startsWith(`STR`)) {
        let name = x.replace('STR', '');
        let currSelect: DynamicField = {
          label: name,
          id: name,
          type: 'select',
          controlName: `level${level}`,
          value: path[level],
          options: [],
        };
        level++;
        let nestedObject = values[x] as { [key: string]: string };
        Object.values(nestedObject).forEach((y) => {
          currSelect['options']?.push({ value: y, label: y });
        });
        newFormContract[1].push(currSelect);
      }
      if (x.startsWith(`POS`)) {
        let nestedObject = values['POS'];
        Object.values(nestedObject).forEach((y) => {
          positionSelect['options']?.push({ value: y, label: y });
        });
      }
      if (x.startsWith(`SUB`)) {
        let nestedObject = values['SUB'];
        Object.values(nestedObject).forEach((y) => {
          subLevelsSelect['options']?.push({ value: y, label: y });
        });
      }
    });
    if ((subLevelsSelect.options?.length || 0) > 0) {
      newFormContract[1].push(subLevelsSelect);
    }
    newFormContract[1].push(positionSelect);
    return newFormContract;
  }
}

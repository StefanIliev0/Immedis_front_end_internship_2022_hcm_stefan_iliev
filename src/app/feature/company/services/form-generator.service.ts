import { Injectable } from '@angular/core';
import { DynamicField } from 'src/app/types/DynamicField';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  constructor() { }

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
          label: 'Hire',
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

  generateEditContractForm(data: { [key: string]: string }) {
    let form: DynamicField[][] = [
      [
        {
          label: 'Contract data ',
          id: 'contractData',
          type: 'header',
        },
      ],
      [
        {
          label: 'Names : ',
          id: 'Names',
          type: 'input',
          kind: 'text',
          disabled: true,
          controlName: `emplName`,
          value: data[`emplName`] || '',
        },
        {
          label: 'Employee Id : ',
          id: 'EmployeeId',
          type: 'input',
          kind: 'text',
          disabled: true,
          controlName: `emplId`,
          value: data[`emplId`] || '',
        },
      ],
      [
        {
          label: 'Start date : ',
          id: 'startDate',
          type: 'input',
          kind: 'date',
          controlName: `startDate`,
          value: data[`startDate`] || '',
          validators: [{ type: `required` }],
        },
        {
          label: 'End date : ',
          id: 'endDate',
          type: 'input',
          kind: 'date',
          controlName: `endDate`,
          value: data[`endDate`] || '',
        },
      ],
      [
        {
          label: 'Base salary : ',
          id: 'grossSalary',
          type: 'input',
          kind: 'number',
          controlName: `grossSalary`,
          value: data[`grossSalary`] || '0',
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: 'Update',
          type: 'button',
        },
      ],
    ];

    return form;
  }

  generateContractForm(
    data: { [key: string]: string },
    canManage: string,
    index: number
  ) {
    let form: DynamicField[][] = [
      [
        {
          label: 'Contract data ',
          id: 'contractData',
          type: 'header',
        },
      ],
      [
        {
          label: 'Names : ',
          id: 'Names',
          type: 'input',
          kind: 'text',
          disabled: true,
          controlName: `emplName`,
          value: data[`emplName`] || '',
        },
        {
          label: 'Employee Id : ',
          id: 'EmployeeId',
          type: 'input',
          kind: 'text',
          disabled: true,
          controlName: `emplId`,
          value: data[`emplId`] || '',
        },
      ],
      [
        {
          label: 'Start date : ',
          id: 'startDate',
          type: 'input',
          kind: 'date',
          controlName: `startDate`,
          disabled: true,
          value: data[`startDate`] || '',
        },
        {
          label: 'End date : ',
          id: 'endDate',
          type: 'input',
          kind: 'date',
          controlName: `endDate`,
          disabled: true,
          value: data[`endDate`] || '',
        },
      ],
      [
        {
          label: 'Base salary : ',
          id: 'grossSalary',
          type: 'input',
          kind: 'number',
          controlName: `grossSalary`,
          disabled: true,
          value: data[`grossSalary`] || '',
        },
      ],
    ];

    if (canManage == 'manage' && index == 0) {
      form.push([
        {
          label: 'Edit',
          type: 'button',
        },
      ]);
    }
    return form;
  }

  generateEditInfoForm(data: { [key: string]: string }) {
    let form: DynamicField[][] = [
      [
        {
          label: 'Employee information',
          id: 'emplINfo',
          type: 'header',
        },
      ],
      [
        {
          label: 'Start date : ',
          id: 'startDate',
          type: 'input',
          kind: 'date',
          disabled: true,
          controlName: `startDate`,
          value: data[`startDate`] || '',
        },
      ],
      [
        {
          label: 'Names : ',
          id: 'name',
          type: 'input',
          controlName: `name`,
          value: data[`name`] || '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
      ],
      [
        {
          label: 'National ID : ',
          id: 'nationalId',
          type: 'input',
          controlName: `nationalId`,
          value: data[`nationalId`] || '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
        {
          label: 'Age : ',
          id: 'age',
          type: 'input',
          kind: 'number',
          controlName: `age`,
          value: data[`age`] || `18`,
          validators: [{ type: `required` }, { type: `min`, value: '18' }],
        },
        {
          label: 'Family status ',
          id: 'familyStatus',
          type: 'select',
          controlName: `familyStatus`,
          value: data[`familyStatus`] || '',
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
          value: data[`birthDate`] || '',
          validators: [{ type: `required` }],
        },
        {
          label: 'Gender ',
          id: 'gender',
          type: 'select',
          controlName: `gender`,
          value: data[`gender`] || '',
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
          value: data[`children`] || '',
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
          id: 'address',
          type: 'input',
          controlName: `address`,
          value: data[`address`] || '',
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
          value: data[`bankName`] || '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
      ],
      [
        {
          label: 'IBAN : ',
          id: 'iban',
          type: 'input',
          controlName: `iban`,
          value: data[`iban`] || '',
          validators: [{ type: `required` }, { type: `minLength`, value: '7' }],
        },
      ],
      [
        {
          label: 'Update',
          type: 'button',
        },
      ],
    ];

    return form;
  }

  generateInformationForm(data: { [key: string]: string }, canManage: string) {
    let form: DynamicField[][] = [
      [
        {
          label: 'Employee information',
          id: 'emplINfo',
          type: 'header',
        },
      ],
      [
        {
          label: 'Start date : ',
          id: 'startDate',
          type: 'input',
          kind: 'date',
          disabled: true,
          controlName: `startDate`,
          value: data[`startDate`] || '',
        },
      ],
      [
        {
          label: 'Names : ',
          id: 'name',
          type: 'input',
          controlName: `name`,
          disabled: true,
          value: data[`name`] || '',
        },
      ],
      [
        {
          label: 'National ID : ',
          id: 'nationalId',
          type: 'input',
          controlName: `nationalId`,
          disabled: true,
          value: data[`nationalId`] || '',
        },
        {
          label: 'Age : ',
          id: 'age',
          type: 'input',
          kind: 'number',
          controlName: `age`,
          disabled: true,
          value: data[`age`] || '',
        },
        {
          label: 'Family status ',
          id: 'familyStatus',
          type: 'select',
          controlName: `familyStatus`,
          disabled: true,
          value: data[`familyStatus`] || '',
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
          disabled: true,
          value: data[`birthDate`] || '',
        },
        {
          label: 'Gender ',
          id: 'gender',
          type: 'select',
          controlName: `gender`,
          disabled: true,
          value: data[`gender`] || '',
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
          disabled: true,
          value: data[`children`] || '',
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
          id: 'address',
          type: 'input',
          controlName: `address`,
          disabled: true,
          value: data[`address`] || '',
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
          disabled: true,
          value: data[`bankName`] || '',
        },
      ],
      [
        {
          label: 'IBAN : ',
          id: 'iban',
          type: 'input',
          controlName: `iban`,
          disabled: true,
          value: data[`iban`] || '',
        },
      ],
    ];

    if (canManage == 'manage') {
      form.push([
        {
          label: 'Edit',
          type: 'button',
        },
      ]);
    }
    return form;
  }

}

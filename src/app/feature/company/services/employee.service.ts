import { Injectable } from '@angular/core';
import { BackEndService } from 'src/app/services/back-end.service';
import { DynamicField } from 'src/app/types/DynamicField';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private backend: BackEndService) {}

  getInformationAboutEmpl(EmplId: string, companyName: string) {
    return this.backend.get(`company/getEmplInfo/${companyName}/${EmplId}`);
  }
  getEmplContract(EmplId: string, companyName: string, index: number) {
    return this.backend.get(
      `company/getEmplContract/${companyName}/${EmplId}/${index}`
    );
  }
  getEmplPayslip(EmplId: string, companyName: string, index: number) {
    return this.backend.get(
      `company/getEmplPayslip/${companyName}/${EmplId}/${index}`
    );
  }
  editEmplInfo(
    data: { [key: string]: string },
    EmplId: string,
    companyName: string
  ) {
    return this.backend.post(
      `company/getEmplInfo/${companyName}/${EmplId}`,
      data
    );
  }
  editEmplContract(
    data: { [key: string]: string },
    EmplId: string,
    companyName: string
  ) {
    return this.backend.post(
      `company/getEmplContract/${companyName}/${EmplId}`,
      data
    );
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
}

import { Injectable } from '@angular/core';
import {
  basicFormValues,
  levelObj,
} from '../components/new-company/new-company.component';
import { DynamicField } from 'src/app/types/DynamicField';
import { BackEndService } from 'src/app/services/back-end.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private backEnd: BackEndService, private router: Router) {}
// redirect to new company dashboard 
  nextRoute(companyName: string) {
    let newCompName =  companyName.replaceAll(` `, ``);
    this.router.navigate([`${newCompName}/dashboard`]);
  }
  //return Observable for creating new company
  createCompany(compObj: any) {
    return this.backEnd.post('company/create_company', compObj);
  }
  //formating final companyObj
  formatCompanyObj(
    data: basicFormValues,
    CompStructureObject: any,
    compStructureTitles: string[]
  ) {
    let finalCompObj = {
      name: CompStructureObject.name.toLowerCase().trim(),
      companyLevels: compStructureTitles,
      hierarhchy: CompStructureObject,
      rules: {
        remuneration: data['remuneration'],
        workHours: data[`WorkHours`],
        paidAnnual: data[`paidAnnual`],
        taxesForEmp: {
          incomeTax: data[`incomeTaxFromEml`],
          SSC: data[`socialSecurityContributionsEml`],
          at: data[`additionalTaxesEml`],
        },
        taxesForEmpr: {
          incomeTax: data[`incomeTaxFromEmlr`],
          SSC: data[`socialSecurityContributionsEmlr`],
          at: data[`additionalTaxesEmlr`],
        },
        bonusesAsPercentages: [
          data[`bonuses1`],
          data[`bonuses2`],
          data[`bonuses3`],
        ],
        taxFreeBonusses: {
          coupons: data[`coupons`],
          child: data[`child`],
        },
      },
      employees: [],
      contracts: [],
    };
    return finalCompObj;
  }
  // add direct employees positioons in CompStructureObject
  addPositions(
    structureModelObject: basicFormValues,
    companyLevel: number,
    compStructureTitles: string[],
    CompStructureObject: any,
    subLevelProcess: levelObj
  ) {
    // make structureModelObject iterable 
    let arr = Object.values(structureModelObject);
    let newArr = [];
    // traversal form data , every 5-th is position name 
    for (let i = 0; i < arr.length; i += 5) {
      let permisionsArr: any[] = [];
      let currPopsitionObj = {
        title: arr[i],
        permissions: [] as any[],
      };
      let passed = false; 
       // traversal by company structyre titles 
      compStructureTitles.forEach((x, y) => {
        let name = '';
      //  if curent level is not passed , name is stucture name by deep in Object 
        if (!passed) {
          switch (y) {
            case 0:
              name = CompStructureObject.name;
              break;
            case 1:
              name = CompStructureObject.sublevels[subLevelProcess[1]].name;
              break;
            case 2:
              name =
                CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
                  subLevelProcess[2]
                ].name;
              break;
            case 3:
              name =
                CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
                  subLevelProcess[2]
                ].sublevels[subLevelProcess[3]].name;
              break;
            case 4:
              name =
                CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
                  subLevelProcess[2]
                ].sublevels[subLevelProcess[3]].sublevels[subLevelProcess[4]]
                  .name;
              break;
            case 5:
              name =
                CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
                  subLevelProcess[2]
                ].sublevels[subLevelProcess[3]].sublevels[subLevelProcess[4]]
                  .sublevels[subLevelProcess[5]].name;
              break;
          }
        } else {
          name = '';
        }
        // if passed name = structural title 
        let perm: any = {
          title: !passed ? name : compStructureTitles[y],
        };

        if (x == compStructureTitles[companyLevel]) {
          passed = true;
        }
        //  constyct and add permission object to user permisions 
        perm.can = {
          read: passed ? Boolean(arr[i + 1]) : false,
          fill: passed ? Boolean(arr[i + 2]) : false,
          menage: passed ? Boolean(arr[i + 3]) : false,
          admin: Boolean(arr[i + 4]),
        };
        permisionsArr.push(perm);
      });
      currPopsitionObj.permissions = permisionsArr;
      newArr.push(currPopsitionObj);
    }
    // adds new position object to correct level in company hierarchy
    switch (companyLevel) {
      case 0:
        CompStructureObject.directEmplPositions = newArr;
        break;
      case 1:
        CompStructureObject.sublevels[subLevelProcess[1]].directEmplPositions =
          newArr;
        break;
      case 2:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].directEmplPositions = newArr;
        break;
      case 3:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].directEmplPositions = newArr;
        break;
      case 4:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[
          subLevelProcess[4]
        ].directEmplPositions = newArr;
        break;
      case 5:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[subLevelProcess[4]].sublevels[
          subLevelProcess[5]
        ].directEmplPositions = newArr;
        break;
    }
  //  return changed company structure object 
    return CompStructureObject;
  }
  // get names of substructuries from CompStructureObject
  getStrNames(
    companyLevel: number,
    CompStructureObject: any,
    subLevelProcess: levelObj
  ) {
    let strArr: any = [];
    switch (companyLevel) {
      case 0:
        strArr = CompStructureObject.name;
        break;
      case 1:
        strArr = CompStructureObject.sublevels?.map(
          (x: basicFormValues) => x[`name`]
        );
        break;
      case 2:
        strArr = CompStructureObject.sublevels[
          subLevelProcess[1]
        ].sublevels?.map((x: basicFormValues) => x[`name`]);
        break;
      case 3:
        strArr = CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels?.map((x: basicFormValues) => x[`name`]);
        break;
      case 4:
        strArr = CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels?.map(
          (x: basicFormValues) => x[`name`]
        );
        break;
      case 5:
        strArr = CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[
          subLevelProcess[4]
        ].sublevels?.map((x: basicFormValues) => x[`name`]);
        break;
      case 6:
        strArr = CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[subLevelProcess[4]].sublevels[
          subLevelProcess[5]
        ].sublevels?.map((x: basicFormValues) => x[`name`]);
        break;
    }
    return strArr;
  }
  // add names to substructories gets from Form in CompStructureObject
  addNamesToStruObj(
    array: string[],
    companyLevel: number,
    CompStructureObject: any,
    compStructureTitles: string[],
    subLevelProcess: levelObj
  ) {
    let strArr = array.map((x) => {
      return {
        name: x,
        directEmplPositions: [],
      };
    });
    switch (companyLevel) {
      case 0:
        CompStructureObject.sublevels = strArr;
        CompStructureObject.subLevelTitle =
          compStructureTitles[companyLevel + 1];
        break;
      case 1:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels = strArr;
        CompStructureObject.sublevels[subLevelProcess[1]].subLevelTitle =
          compStructureTitles[companyLevel + 1];
        break;
      case 2:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels = strArr;
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].subLevelTitle = compStructureTitles[companyLevel + 1];
        break;
      case 3:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels = strArr;
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].subLevelTitle = compStructureTitles[companyLevel + 1];
        break;
      case 4:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[
          subLevelProcess[4]
        ].sublevels = strArr;
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].subLevelTitle =
          compStructureTitles[companyLevel + 1];
        break;
      case 5:
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[subLevelProcess[4]].sublevels[
          subLevelProcess[5]
        ].sublevels = strArr;
        CompStructureObject.sublevels[subLevelProcess[1]].sublevels[
          subLevelProcess[2]
        ].sublevels[subLevelProcess[3]].sublevels[
          subLevelProcess[4]
        ].subLevelTitle = compStructureTitles[companyLevel + 1];
        break;
    }

    return CompStructureObject;
  }
  //generate form for adds new employee position to stucture
  generateFirstStructureFormModel(
    subProcess: number,
    companyLevel: number,
    compStructureTitles: string[],
    currentStruturesNames: string[],
    subLevelProcess: levelObj,
    basicCompanyInfo: basicFormValues
  ) {
    let formModel = [
      [
        {
          type: 'header',
          label: `Appointed officers at the ${
            compStructureTitles[companyLevel]
          } ${
            companyLevel > 0
              ? currentStruturesNames[subLevelProcess[companyLevel]]
              : basicCompanyInfo['name']
          }`,
        },
      ],
      [
        {
          label: `Position`,
          id: `level${subProcess}`,
          type: `input`,
          kind: `text`,
          controlName: `position${subProcess}`,
          placeholder: `Position of an employee...`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
        {
          label: `Can read data`,
          id: `can-read${subProcess}`,
          type: `checkbox`,
          value: false,
          controlName: `can-read${subProcess}`,
        },
        {
          label: `Can write data`,
          id: `can-write${subProcess}`,
          type: `checkbox`,
          value: false,
          controlName: `can-write${subProcess}`,
        },
        {
          label: `Can manage data`,
          id: `can-manage${subProcess}`,
          type: `checkbox`,
          value: false,
          controlName: `can-manage${subProcess}`,
        },
        {
          label: `Can administrate data`,
          id: `can-admin${subProcess}`,
          type: `checkbox`,
          value: false,
          controlName: `can-admin${subProcess}`,
        },
      ],
      [
        {
          type: 'button',
          label: 'Add position',
        },
      ],
    ];

    return formModel;
  }
  //adds new name field to substructure form template
  addName(subProcess: number, formModel: DynamicField[][]) {
    let newName = [
      {
        label: `Name Of substructure`,
        id: `name${subProcess}`,
        type: `input`,
        kind: `text`,
        controlName: `name${subProcess}`,
        placeholder: `name Of substructure here...`,
        value: '',
        validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
      },
    ];
    formModel.splice(formModel.length - 1, 0, newName);
    return formModel;
  }
  // generate substructure form template
  generateSecondStructureFormModel(
    subProcess: number,
    companyLevel: number,
    compStructureTitles: string[]
  ) {
    let formModel = [
      [
        {
          type: 'header',
          label: `Names of the substructures of this ${compStructureTitles[companyLevel]}`,
        },
      ],
      [
        {
          label: `Name Of substructure`,
          id: `name${subProcess}`,
          type: `input`,
          kind: `text`,
          controlName: `name${subProcess}`,
          placeholder: `name Of substructure here...`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
      ],
      [
        {
          type: 'button',
          label: 'Add one more',
        },
      ],
    ];

    return formModel;
  }
  //add new position field to direct employes  form template
  addPosition(subProcess: number, formModel: DynamicField[][]) {
    let newPosition = [
      {
        label: `Position`,
        id: `level${subProcess}`,
        type: `input`,
        kind: `text`,
        controlName: `position${subProcess}`,
        placeholder: `Position of an employee...`,
        value: '',
        validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
      },
      {
        label: `Can read data`,
        id: `can-read${subProcess}`,
        type: `checkbox`,
        value: false,
        controlName: `can-read${subProcess}`,
      },
      {
        label: `Can write data`,
        id: `can-write${subProcess}`,
        type: `checkbox`,
        value: false,
        controlName: `can-write${subProcess}`,
      },
      {
        label: `Can manage data`,
        id: `can-manage${subProcess}`,
        type: `checkbox`,
        value: false,
        controlName: `can-manage${subProcess}`,
      },
      {
        label: `Can administrate data`,
        id: `can-admin${subProcess}`,
        type: `checkbox`,
        value: false,
        controlName: `can-admin${subProcess}`,
      },
    ];
    formModel.splice(formModel.length - 1, 0, newPosition);

    return formModel;
  }
  //generate vertical hierarchy title field 
  generateCompLevelsStructure(basicCompanyInfo: basicFormValues) {
    let newFormarr: DynamicField[][] = [];
    newFormarr[0] = [];
    for (let i = 1; i <= Number(basicCompanyInfo['levels']); i++) {
      newFormarr[0].push({
        label: `${i} structure level name `,
        id: `${i} level`,
        type: `input`,
        kind: `text`,
        controlName: `${i}level`,
        placeholder: `name of company structure...`,
        value: '',
        validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
      });
    }
    newFormarr[0].push({
      type: 'button',
      label: 'Next',
    });
    return newFormarr;
  }
  //generate ask for substucture form model object
  generateAskForSubstruct() {
    let formModel = [
      [
        {
          label: ` Does this structure have substructures?`,
          id: `select`,
          options: [
            {
              value: 'no',
              label: 'No',
            },
            {
              value: 'yes',
              label: 'Yes',
            },
          ],
          type: `select`,
          controlName: `askSub`,
          value: 'no',
        },
      ],
    ];
    return formModel;
  }
  //generate basic info  form model object
  generateBasicCompanyInfoModel() {
    return [
      [
        {
          label: `Company name`,
          id: `companyName`,
          type: `input`,
          kind: `text`,
          controlName: `name`,
          placeholder: `new company name...`,
          value: '',
          validators: [{ type: `required` }, { type: `minLength`, value: '2' }],
        },
        {
          label: `Max level of company structure`,
          id: `levels`,
          type: `input`,
          kind: `number`,
          controlName: `levels`,
          placeholder: `number of company structures...`,
          value: '1',
          validators: [
            { type: `max`, value: '5' },
            { type: `min`, value: '1' },
            { type: `required` },
          ],
        },
        {
          type: 'button',
          label: 'Set',
        },
      ],
    ];
  }
  //generate rules form object
  generateRuleFormModel() {
    return [
      [
        {
          type: 'header',
          label: `Rules for entering data for reports.`,
        },
      ],
      [
        {
          label: `Basis of remuneration `,
          id: `remuneration`,
          options: [
            {
              value: 'yearly',
              label: 'Yearly',
            },
            {
              value: 'monthly',
              label: 'Monthly',
            },
            {
              value: 'hourly',
              label: 'Hourly',
            },
          ],
          type: `select`,
          controlName: `remuneration`,
          value: 'monthly',
        },
      ],
      [
        {
          label: `Working hours per week.`,
          id: `WorkHours`,
          type: `input`,
          kind: `number`,
          controlName: `WorkHours`,
          placeholder: ``,
          value: '40',
          validators: [
            { type: `required` },
            { type: `min`, value: '1' },
            { type: `max`, value: '80' },
          ],
        },
      ],
      [
        {
          label: `Paid annual leave in days.`,
          id: `paidAnnual`,
          type: `input`,
          kind: `number`,
          controlName: `paidAnnual`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '1' },
            { type: `max`, value: '300' },
          ],
        },
      ],
      [
        {
          type: 'header',
          label: `Deductions by the employee.`,
        },
      ],
      [
        {
          label: `Income Tax in percentages from the gross salary`,
          id: `incomeTaxFromEml`,
          type: `input`,
          kind: `number`,
          controlName: `incomeTaxFromEml`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          label: `Social Security Contributions in percentages from the gross salary`,
          id: `socialSecurityContributionsEml`,
          type: `input`,
          kind: `number`,
          controlName: `socialSecurityContributionsEml`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          label: `Additional Taxes in percentages from the gross salary`,
          id: `additionalTaxesEml`,
          type: `input`,
          kind: `number`,
          controlName: `additionalTaxesEml`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          type: 'header',
          label: `Deductions by the employer.`,
        },
      ],
      [
        {
          label: `Income Tax in percentages from the gross salary`,
          id: `incomeTaxFromEmlr`,
          type: `input`,
          kind: `number`,
          controlName: `incomeTaxFromEmlr`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          label: `Social Security Contributions in percentages from the gross salary`,
          id: `socialSecurityContributionsEmlr`,
          type: `input`,
          kind: `number`,
          controlName: `socialSecurityContributionsEmlr`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          label: `Additional Taxes in percentages from the gross salary`,
          id: `additionalTaxesEmlr`,
          type: `input`,
          kind: `number`,
          controlName: `additionalTaxesEmlr`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          type: 'header',
          label: `Taxable allowances.`,
        },
      ],
      [
        {
          label: `Usual bonuses as percentages of gross salary.`,
          id: `bonuses1`,
          type: `input`,
          kind: `number`,
          controlName: `bonuses1`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          label: `Usual bonuses as percentages of gross salary.`,
          id: `bonuses2`,
          type: `input`,
          kind: `number`,
          controlName: `bonuses2`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          label: `Usual bonuses as percentages of gross salary.`,
          id: `bonuses3`,
          type: `input`,
          kind: `number`,
          controlName: `bonuses3`,
          placeholder: ``,
          value: '0',
          validators: [
            { type: `required` },
            { type: `min`, value: '0' },
            { type: `max`, value: '99' },
          ],
        },
      ],
      [
        {
          type: 'header',
          label: `Tax-free allowances.`,
        },
      ],
      [
        {
          label: `Tax-free coupons per month as an amount in local currency`,
          id: `coupons`,
          type: `input`,
          kind: `number`,
          controlName: `coupons`,
          placeholder: ``,
          value: '0',
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: `Child benefits per month as an amount in local currency for children`,
          id: `child`,
          type: `input`,
          kind: `number`,
          controlName: `child`,
          placeholder: ``,
          value: '0',
          validators: [{ type: `required` }, { type: `min`, value: '0' }],
        },
      ],
      [
        {
          label: `Finish`,
          type: `button`,
        },
      ],
    ];
  }
}

import { Component, OnDestroy } from '@angular/core';
import { DynamicField } from 'src/app/types/DynamicField';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';

export type basicFormValues = {
  [key: string]: string;
};
export type levelObj = {
  [key: string]: number;
};

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnDestroy {
  constructor(private service: AdminService) {}

  //variables that hold the state of the process.
  generalProcess = 0;
  companyMaxLevel = 0;
  companyLevel = 0;
  process = 0;
  subProcess = 0;
  askForSubstr = 0;

  //variable that keeps the company's current levels
  subLevelProcess: levelObj = {
    0: 0,
    max0: 0,
    1: 0,
    max1: 0,
    2: 0,
    max2: 0,
    3: 0,
    max3: 0,
    4: 0,
    max4: 0,
    5: 0,
    max5: 0,
  };

  //variables that hold the state of forms.
  basicCompanyInfo: basicFormValues = {};
  ruleModelObj: basicFormValues = {};
  structureModelObject: basicFormValues = {};
  askModelObj: basicFormValues = {};
  //arrays that hold titles and names of company structures
  compStructureTitles: string[] = [];
  currentStruturesNames: string[] = [];
  //arrays that hold form objects
  basicCompanyInfoModel: DynamicField[][] =
    this.service.generateBasicCompanyInfoModel();
  ruleFormModel: DynamicField[][] = this.service.generateRuleFormModel();
  compStructureTitlesModel: DynamicField[][] = [];
  formModel: DynamicField[][] = [];

  //variable that keeps the final company object
  CompStructureObject: any = {};

  newCompany$: Subscription = new Subscription();

  // transform CompStructureObject and add new company to DB
  SubmitData() {
    let finalCompObj = this.service.formatCompanyObj(
      this.ruleModelObj,
      this.CompStructureObject,
      this.compStructureTitles
    );

    this.newCompany$ = this.service
      .createCompany(finalCompObj)
      .subscribe((x) => {
        this.service.nextRoute(this.basicCompanyInfo[`name`]);
      });
  }

  //change state of component, control view and company object
  onNextProcess() {
    if (this.process == 0 && this.askForSubstr == 0) {
      this.CompStructureObject = this.service.addPositions(
        this.structureModelObject,
        this.companyLevel,
        this.compStructureTitles,
        this.CompStructureObject,
        this.subLevelProcess
      );
    }
    if (
      this.process == 0 &&
      this.askForSubstr == 0 &&
      this.companyLevel < this.companyMaxLevel - 1
    ) {
      this.subProcess = 0;
      this.formModel = this.service.generateAskForSubstruct();
      this.askForSubstr = 1;
      return;
    }
    if (
      this.process == 0 &&
      this.askForSubstr == 1 &&
      this.askModelObj[`askSub`] == 'yes'
    ) {
      this.process = 1;
      this.generateNextProcessForm();
      this.askForSubstr = 0;
      return;
    }
    if (
      (this.process == 0 &&
        this.askForSubstr == 1 &&
        this.askModelObj[`askSub`] == 'no') ||
      (this.process == 0 &&
        this.askForSubstr == 0 &&
        this.companyLevel == this.companyMaxLevel - 1)
    ) {
      this.subProcess = 0;
      this.subLevelProcess[this.companyLevel]++;
      if (
        this.subLevelProcess[`max${this.companyLevel}`] <=
          this.subLevelProcess[this.companyLevel] &&
        this.companyLevel >= 1
      ) {
        while (
          this.subLevelProcess[`max${this.companyLevel}`] <=
          this.subLevelProcess[this.companyLevel]
        ) {
          this.subLevelProcess[`max${this.companyLevel}`] = 0;
          this.subLevelProcess[this.companyLevel] = 0;
          this.subLevelProcess[this.companyLevel - 1]++;
          this.companyLevel--;
          if (this.companyLevel == 0) {
            this.onNext(3);
            return;
          }
        }
      }
      this.currentStruturesNames = this.service.getStrNames(
        this.companyLevel,
        this.CompStructureObject,
        this.subLevelProcess
      );
      this.askForSubstr = 0;
      this.generateNextProcessForm();
      return;
    }
    if (this.process == 1 && this.companyLevel < this.companyMaxLevel) {
      this.process = 0;
      this.askModelObj[`askSub`] = 'no';
      let strArr = Object.values(this.structureModelObject);
      this.currentStruturesNames = strArr;
      this.CompStructureObject = this.service.addNamesToStruObj(
        strArr,
        this.companyLevel,
        this.CompStructureObject,
        this.compStructureTitles,
        this.subLevelProcess
      );
      this.companyLevel++;
      this.subLevelProcess[`max${this.companyLevel}`] = strArr.length;
      this.formModel = this.service.generateFirstStructureFormModel(
        this.subProcess,
        this.companyLevel,
        this.compStructureTitles,
        this.currentStruturesNames,
        this.subLevelProcess,
        this.basicCompanyInfo
      );
      return;
    }
  }

  //relative to the state adds the regular field to the form
  AddElement() {
    if (this.process == 0) {
      //update form object
      this.formModel = this.formModel?.map((x) => {
        return x.map((x) => {
          if (this.structureModelObject?.[x.controlName || '']) {
            let newVlaue = this.structureModelObject[x.controlName || ''];
            return { ...x, value: newVlaue };
          }
          return x;
        });
      });
      this.subProcess++;
      // add new field
      this.formModel = this.service.addPosition(
        this.subProcess,
        this.formModel
      );
      return;
    }
    if (this.process == 1) {
      //update form object
      this.formModel = this.formModel?.map((x) => {
        return x.map((x) => {
          if (this.structureModelObject?.[x.controlName || '']) {
            let newVlaue = this.structureModelObject[x.controlName || ''];
            return { ...x, value: newVlaue };
          }
          return x;
        });
      });
      this.subProcess++;
      // add new field
      this.formModel = this.service.addName(this.subProcess, this.formModel);
      return;
    }
  }
  //relative to the state adds the regular form to the view
  generateNextProcessForm() {
    if (this.process == 0) {
      this.formModel = this.service.generateFirstStructureFormModel(
        this.subProcess,
        this.companyLevel,
        this.compStructureTitles,
        this.currentStruturesNames,
        this.subLevelProcess,
        this.basicCompanyInfo
      );
      return;
    }
    if (this.process == 1) {
      this.formModel = this.service.generateSecondStructureFormModel(
        this.subProcess,
        this.companyLevel,
        this.compStructureTitles
      );
      return;
    }
  }
  //get actual data for struture ot company
  getStruData(form: basicFormValues) {
    //relative to the state update the regular form
    if (this.askForSubstr == 1) {
      this.askModelObj = form;
    } else if (this.askForSubstr == 0) {
      this.structureModelObject = form;
    }
  }
  //get actual data from rule form
  getRuleData(form: basicFormValues) {
    this.ruleModelObj = form;
  }
  //get actual data from structures form
  getSruct(form: basicFormValues) {
    this.compStructureTitles = Object.values(form);
  }
  // change basic view of component
  onNext(value: number) {
    this.generalProcess = value;
    if (this.generalProcess == 1) {
      this.compStructureTitlesModel = this.service.generateCompLevelsStructure(
        this.basicCompanyInfo
      );
    }
    if (this.generalProcess == 2) {
      this.CompStructureObject.name = this.basicCompanyInfo['name'];
      this.CompStructureObject.subLevelTitle =
        this.compStructureTitles[this.companyLevel + 1];
      this.companyMaxLevel = Number(this.basicCompanyInfo['levels']);
      this.generateNextProcessForm();
    }
  }

  ngOnDestroy(): void {
    this.newCompany$.unsubscribe();
  }
}

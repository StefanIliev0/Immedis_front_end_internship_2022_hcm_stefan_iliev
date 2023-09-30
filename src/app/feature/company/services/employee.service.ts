import { Injectable } from '@angular/core';
import { BackEndService } from 'src/app/services/back-end.service';

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

}

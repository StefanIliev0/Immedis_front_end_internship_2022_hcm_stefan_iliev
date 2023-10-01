import { Injectable } from '@angular/core';
import { BackEndService } from 'src/app/services/back-end.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private backend: BackEndService) {}
// makes request to server for getting employee data.
  getInformationAboutEmpl(EmplId: string, companyName: string) {
    return this.backend.get(`company/getEmplInfo/${companyName}/${EmplId}`);
  }
  // makes request to server for getting employee contract data.
  getEmplContract(EmplId: string, companyName: string, index: number) {
    return this.backend.get(
      `company/getEmplContract/${companyName}/${EmplId}/${index}`
    );
  }
  // makes request to server for getting employee payslip data.
  getEmplPayslip(EmplId: string, companyName: string, index: number) {
    return this.backend.get(
      `company/getEmplPayslip/${companyName}/${EmplId}/${index}`
    );
  }
  // makes request to server for update employee data.
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
  // makes request to server for update employee contract data.
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

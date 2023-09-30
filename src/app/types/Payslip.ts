export type Payslip = {
    paymantDay: string,
    month: string,
    year: string,
    GrossPaytoEmpl: string,
    netPaytoEmpl: string,
    totalPay: string,
    overtimeHours: string,
    overtimeHolydaysHour: string,
    unpaidHours: string,
    bonus: string,
    sickLeaveDays: string,
    anualLeaveDays: string,
    childBenefits: string,
    taxes: {
        taxesForEmp: {
            incomeTax: string,
            SSC: string,
            at: string,
        },
        taxesForEmpr: {
            incomeTax: string,
            SSC: string,
            at: string,
        }
    },
    _id: string,
    name: string,
    position: string,
    BaseSalary: string,
}
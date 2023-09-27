export type TableObject ={
    current: {
        name: string,
        title: string,
        totalPayment: number,
        grossSalaryPayment: number
    },
    employes : {
        id : string,
        name : string , 
        position : string, 
        grossSalaryPayment : number ,
        totalPayment : number,
        lastPayCheck : {
            overtimeHours : string,
            overtimeHolydaysHour : string,
            unpaidHours :string,
            bonus : string,
            sickLeaveDays : string,
            anualLeaveDays : string
        },
        endDate : string
    }[],
    substructures :{
            name: string,
            totalPayment: number,
            grossSalaryPayment: number
        }[],
    thisMounthAproved : boolean 
}
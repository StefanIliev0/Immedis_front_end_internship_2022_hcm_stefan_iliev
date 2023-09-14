import { createActionGroup , props , emptyProps} from "@ngrx/store";
import { CompanyStructure } from "src/app/types/CompanyStruture";


export const companyStructureActions = createActionGroup({
    source: 'CompanyStructure',
    events : {
        "add" : props<{ structure: CompanyStructure[]}>(),
        "remove" : emptyProps() ,
        },
    });
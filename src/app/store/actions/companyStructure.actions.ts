import { createActionGroup , props , emptyProps} from "@ngrx/store";
import { CompanySubstructure } from "src/app/types/CompanyStruture";


export const companyStructureActions = createActionGroup({
    source: 'CompanyStructure',
    events : {
        "add" : props<{ structure: CompanySubstructure}>(),
        "remove" : emptyProps() ,
        },
    });
import { createActionGroup , props , emptyProps} from "@ngrx/store";


export const PathActions = createActionGroup({
    source: 'Path',
    events : {
        "add" : props<{ path: string[] }>(),
        "remove" : emptyProps()  
        },
    });
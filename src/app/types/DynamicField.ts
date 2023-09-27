

export type DynamicField = {
    label? : string ,
    id? : string ,
    type : string ,
    errLabel? : string,
    disabled? : boolean,
    kind? : string , 
    controlName? : string,
    placeholder? : string,
    value? : string | boolean,
    options? : {value : string , label : string}[],
    validators? : {type : string , value? : string}[]
}
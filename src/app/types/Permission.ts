

export type Permission = {
    title : string ,
    can : {
        read? : boolean , 
        fill? : boolean , 
        menage? : boolean,
        admin? : boolean, 
    }
}
import { Permission } from "./Permission"



export type User = {
    _id : string ,
    permissions : Permission[] , 
    HcmToken : string ,
    isNewEmpl? : boolean , 
    email : string,
}
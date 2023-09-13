import { Permission } from "./Permission"



export type User = {
    _id : string ,
    permissions : Permission[] , 
    token : string ,
}
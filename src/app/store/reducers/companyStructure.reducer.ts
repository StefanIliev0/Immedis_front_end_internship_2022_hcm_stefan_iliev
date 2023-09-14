import { createReducer, on } from '@ngrx/store';


import { CompanyStructure } from 'src/app/types/CompanyStruture';
import { companyStructureActions } from '../actions/companyStructure.actions';





export const initialState : CompanyStructure[] | [] = [] ;

export const userReducer = createReducer(
  initialState,
  on(companyStructureActions.add , (_state , {structure}) => structure ), 
  on(companyStructureActions.remove, (_state) => initialState ) 
); 

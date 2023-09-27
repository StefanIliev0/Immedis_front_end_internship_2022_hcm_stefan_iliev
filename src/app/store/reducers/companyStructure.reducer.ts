import { createReducer, on } from '@ngrx/store';


import { CompanySubstructure } from 'src/app/types/CompanyStruture';
import { companyStructureActions } from '../actions/companyStructure.actions';





export const initialState : CompanySubstructure   =  [] ;

export const companyStructureReducer = createReducer(
  initialState,
  on(companyStructureActions.add , (_state , {structure}) => structure  ), 
  on(companyStructureActions.remove, (_state) => initialState ) 
); 

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CompanySubstructure } from 'src/app/types/CompanyStruture';

 
export const selectStructure = createFeatureSelector<CompanySubstructure>('struture');
 
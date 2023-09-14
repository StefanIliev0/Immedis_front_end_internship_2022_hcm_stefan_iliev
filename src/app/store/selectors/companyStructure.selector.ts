import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CompanyStructure } from 'src/app/types/CompanyStruture';

 
export const selectStructure = createFeatureSelector<CompanyStructure[]>('struture');
 
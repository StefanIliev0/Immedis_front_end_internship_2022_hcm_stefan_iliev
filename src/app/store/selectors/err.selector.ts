import { createFeatureSelector } from '@ngrx/store';
 
export const selectErr = createFeatureSelector<string>('err');
 

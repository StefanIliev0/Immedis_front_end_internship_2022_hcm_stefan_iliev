import { createFeatureSelector } from '@ngrx/store';
 
export const selectPath = createFeatureSelector<string[]>('path');
 

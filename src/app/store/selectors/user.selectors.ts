import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from 'src/app/types/User';

 
export const selectUser = createFeatureSelector<User>('user');
 

export const selectIsAuth = createSelector(
    selectUser,
  (user) => {
        if(user._id){
            return true
        }else{
            return false
        }
  }
);
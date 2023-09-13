import { createReducer, on } from '@ngrx/store';


import { User } from 'src/app/types/User';
import { UsersActions } from '../actions/user.actions';





export const initialState : User | {} = {} ;

export const userReducer = createReducer(
  initialState,
  on(UsersActions.add , (_state , {user}) => user ), 
  on(UsersActions.remove, (_state) => initialState ) 
); 

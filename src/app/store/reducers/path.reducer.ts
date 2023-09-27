import { createReducer, on } from '@ngrx/store';


import { PathActions } from '../actions/path.actions';



export const initialState : string[] = [] ;

export const PathReducer = createReducer(
  initialState,
  on(PathActions.add , (_state , {path}) => {return path}), 
  on(PathActions.remove, (_state) => initialState ),
);

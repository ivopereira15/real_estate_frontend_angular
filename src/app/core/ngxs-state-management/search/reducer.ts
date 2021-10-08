
import { Action, createReducer, on } from '@ngrx/store';
import { FormState, initialState } from '../../../shared/models/search/search.model';
import { delayedFormStateRecieved, formValueChange } from './actions';


const formReducer = createReducer(
  initialState,
  on(
    formValueChange,
    delayedFormStateRecieved,
    (state, { type, ...update }) => ({ ...state, ...update })
  )
);

export function reducer(state: FormState | undefined, action: Action) {
  return formReducer(state, action);
}
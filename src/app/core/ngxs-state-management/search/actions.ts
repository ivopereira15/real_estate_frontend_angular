import { createAction, props } from '@ngrx/store';
import { FormState } from '../../../shared/models/search/search.model';

export const formValueChange = createAction(
  '[Form] Value Change',
  props<FormState>()
);

export const delayedFormStateRecieved = createAction(
  '[Form] Delayed Form State Received',
  props<FormState>()
);



export const searchActionTypes = {
    formValueChange,
    delayedFormStateRecieved
  };

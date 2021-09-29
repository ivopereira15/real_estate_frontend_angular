import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { createAdapter, toSource } from '@state-adapt/core';
import { Adapt } from '@state-adapt/ngrx';

import { FormState, initialState } from '../../../shared/models/search/search.model';
@Component({
  selector: 'app-state-adapt-advanced-form',
  template: `
    <form>
      <input type="text" [formControl]="name" [setValue]="name$ | async" />
      <input type="number" [formControl]="age" [setValue]="age$ | async" />
    </form>
  `
})
export class StateAdaptAdvancedFormComponent {
  name = new FormControl(initialState.name);
  age = new FormControl(initialState.age);

  nameChange$ = this.name.valueChanges.pipe(toSource('[Form] Name Change'));
  ageChange$ = this.age.valueChanges.pipe(toSource('[Form] Age Change'));

  formAdapter = createAdapter<FormState>()({
    changeName: (state, name: string) => ({ ...state, name }),
    changeAge: (state, age: number) => ({ ...state, age }),
    selectors: {
      getName: state => state.name,
      getAge: state => state.age
    }
  });

  formStore = this.adapt.init(
    ['advancedForm', this.formAdapter, initialState],
    {
      changeName: this.nameChange$,
      changeAge: this.ageChange$
    }
  );

  name$ = this.formStore.getName();
  age$ = this.formStore.getAge();

  constructor(private fb: FormBuilder, private adapt: Adapt) {}
}

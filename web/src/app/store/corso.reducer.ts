import { createReducer, on } from '@ngrx/store';
import { Corso } from '../corso';
import { CorsoActions } from './corso.actions';

const initialState: Corso = {
  name: 'Algo',
  professor: 'Monty',
};

export const corsoReducer = createReducer(
  initialState,
  on(CorsoActions.selectCorso, (state, selectedCorso) => {
    return selectedCorso.corso;
  })
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Corso } from '../corso';

export const selectCorso = createFeatureSelector<Corso>('corso');

export const selectCorsoName = createSelector(selectCorso, (corso) => {
  return corso.name;
});

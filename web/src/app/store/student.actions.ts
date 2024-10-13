import { createActionGroup } from '@ngrx/store';

import { props } from '@ngrx/store';
import { Student } from '../student';

//The props method is used to define any additional
//metadata needed for the handling of the action
//Si usa la createAction per returnare una Action quando la si dispatcha

//createActionGroup crea più azioni da una sola fonte
export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Select Student': props<{ student: Student }>(),
    'Suggesteted Students': props<{ students: Student[] }>(),
  },
});

import { Action, createActionGroup } from '@ngrx/store';
import { Corso } from '../corso';

import { createAction, props } from '@ngrx/store';

//The props method is used to define any additional
//metadata needed for the handling of the action
//Si usa la createAction per returnare una Action quando la si dispatcha

export const CorsoActions = createActionGroup({
  source: 'Corso',
  events: {
    'Select Corso': props<{ corso: Corso }>(),
  },
});

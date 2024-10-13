import { createReducer, on } from '@ngrx/store';
import { Student } from '../student';
import { StudentActions } from './student.actions';

const initialStateStudent: Student = {
  id: -1,
  matricola: 0,
  nome: 'Algo',
  cognome: 'Monty',
};

export const studentReducer = createReducer(
  initialStateStudent,
  on(StudentActions.selectStudent, (state, selectedStudent) => {
    return selectedStudent.student;
  })
);

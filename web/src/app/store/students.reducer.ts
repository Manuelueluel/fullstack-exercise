import { createReducer, on } from '@ngrx/store';
import { Student } from '../student';
import { StudentActions } from './student.actions';

const initialStateStudents: Student[] = [];

export const studentsReducer = createReducer(
  initialStateStudents,
  on(StudentActions.suggestetedStudents, (state, suggestetedStudents) => {
    return suggestetedStudents.students;
  })
);

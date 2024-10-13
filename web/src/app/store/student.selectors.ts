import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Student } from '../student';

export const selectStudent = createFeatureSelector<Student>('student');

export const selectStudentMatricola = createSelector(
  selectStudent,
  (student) => {
    return student.matricola;
  }
);

export const suggestetedStudents = createFeatureSelector<Student[]>('students');

export const suggestetedMatricola = createSelector(
  suggestetedStudents,
  (students: Student[]) => {
    return students.map((student: Student) => `${student.matricola}`);
  }
);

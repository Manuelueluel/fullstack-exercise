"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentReducer = void 0;
var store_1 = require("@ngrx/store");
var student_actions_1 = require("./student.actions");
var initialStateStudent = {
    id: -1,
    matricola: 0,
    nome: 'Algo',
    cognome: 'Monty',
};
exports.studentReducer = (0, store_1.createReducer)(initialStateStudent, (0, store_1.on)(student_actions_1.StudentActions.selectStudent, function (state, selectedStudent) {
    return selectedStudent.student;
}));

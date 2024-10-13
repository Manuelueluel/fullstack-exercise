"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsReducer = void 0;
var store_1 = require("@ngrx/store");
var student_actions_1 = require("./student.actions");
var initialStateStudents = [];
exports.studentsReducer = (0, store_1.createReducer)(initialStateStudents, (0, store_1.on)(student_actions_1.StudentActions.suggestetedStudents, function (state, suggestetedStudents) {
    return suggestetedStudents.students;
}));

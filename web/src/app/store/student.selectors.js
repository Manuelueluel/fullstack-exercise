"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestetedMatricola = exports.suggestetedStudents = exports.selectStudentMatricola = exports.selectStudent = void 0;
var store_1 = require("@ngrx/store");
exports.selectStudent = (0, store_1.createFeatureSelector)('student');
exports.selectStudentMatricola = (0, store_1.createSelector)(exports.selectStudent, function (student) {
    return student.matricola;
});
exports.suggestetedStudents = (0, store_1.createFeatureSelector)('students');
exports.suggestetedMatricola = (0, store_1.createSelector)(exports.suggestetedStudents, function (students) {
    return students.map(function (student) { return "".concat(student.matricola); });
});

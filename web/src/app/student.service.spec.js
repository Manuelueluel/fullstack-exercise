"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var student_service_1 = require("./student.service");
describe('StudentService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(student_service_1.StudentService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

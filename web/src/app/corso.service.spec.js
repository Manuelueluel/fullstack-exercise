"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var corso_service_1 = require("./corso.service");
describe('CorsoService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(corso_service_1.CorsoService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

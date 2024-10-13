"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var iscrizione_service_1 = require("./iscrizione.service");
describe('IscrizioneService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(iscrizione_service_1.IscrizioneService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginaStudentComponent = void 0;
var core_1 = require("@angular/core");
var student_actions_1 = require("../store/student.actions");
var student_selectors_1 = require("../store/student.selectors");
var PaginaStudentComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-pagina-student',
            templateUrl: './pagina-student.component.html',
            styleUrls: ['./pagina-student.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaginaStudentComponent = _classThis = /** @class */ (function () {
        function PaginaStudentComponent_1(serviceStudent, store) {
            var _this = this;
            this.serviceStudent = serviceStudent;
            this.store = store;
            this.active = 1;
            this.selectedStudent = {
                id: -1,
                matricola: -1,
                nome: '',
                cognome: '',
            };
            this.studentSelezionato$ = this.store
                .select(student_selectors_1.selectStudent)
                .subscribe(function (student) {
                _this.titleModificaStudent = $localize(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Modify student ", ""], ["Modify student ", ""])), student.matricola);
                _this.titleCancellaStudent = $localize(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Delete student ", ""], ["Delete student ", ""])), student.matricola);
            });
            this.studentTable = {
                headers: [
                    $localize(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Id"], ["Id"]))),
                    $localize(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Badge number"], ["Badge number"]))),
                    $localize(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Name"], ["Name"]))),
                    $localize(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Surname"], ["Surname"]))),
                ],
                rows: [],
            };
            this.titleStudentTable = $localize(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Students list"], ["Students list"])));
            this.titleAggiungiStudente = $localize(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Add student"], ["Add student"])));
            this.titleIscrizioneStudente = $localize(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Enroll student in a course"], ["Enroll student in a course"])));
            this.showModificaStudent = false;
            this.showCancellaStudent = false;
        }
        PaginaStudentComponent_1.prototype.ngOnInit = function () {
            this.getStudents();
        };
        //Creo un nuovo studente
        PaginaStudentComponent_1.prototype.createStudentEvent = function (student) {
            var _this = this;
            var newStudent = {
                matricola: +student[0],
                nome: student[1],
                cognome: student[2],
            };
            this.serviceStudent
                .createStudent(newStudent)
                .subscribe(function () { return _this.getStudents(); });
        };
        //Seleziono uno studente dalla lista
        PaginaStudentComponent_1.prototype.selectStudentEvent = function (student) {
            //Mostro i componenti di modifica e canellazione di uno studente
            this.showModificaStudent = true;
            this.showCancellaStudent = true;
            //Selezionando uno student prendo il suo id, mi servirà per l'updateStudent
            this.selectedStudent.id = +student[0];
            this.selectedStudent.matricola = +student[1];
            this.selectedStudent.nome = student[2];
            this.selectedStudent.cognome = student[3];
            this.store.dispatch(student_actions_1.StudentActions.selectStudent({ student: this.selectedStudent }));
        };
        //Update studente dalla form
        PaginaStudentComponent_1.prototype.updateStudentEvent = function (student) {
            var _this = this;
            //Modifico student dai dati del form passati tramite student, eccetto l'id
            var studentUpdated = {
                matricola: +student[0],
                nome: student[1],
                cognome: student[2],
            };
            this.serviceStudent
                .updateStudent(this.selectedStudent.id, studentUpdated)
                .subscribe(function () { return _this.getStudents(); });
            this.showModificaStudent = false;
        };
        PaginaStudentComponent_1.prototype.deleteStudent = function () {
            var _this = this;
            this.serviceStudent
                .deleteStudent(this.selectedStudent.id)
                .subscribe(function () { return _this.getStudents(); });
            this.hideCancellaStudent();
            this.hideModificaStudent();
        };
        //Nasconde component cancella student
        PaginaStudentComponent_1.prototype.hideCancellaStudent = function () {
            this.showCancellaStudent = false;
        };
        //Nasconde component modifica student
        PaginaStudentComponent_1.prototype.hideModificaStudent = function () {
            this.showModificaStudent = false;
        };
        //fetch lista studenti
        PaginaStudentComponent_1.prototype.getStudents = function () {
            var _this = this;
            this.studentTable.rows = [];
            this.serviceStudent.getStudents().subscribe(function (students) {
                return students.forEach(function (element) {
                    _this.studentTable.rows.push([
                        element.id,
                        element.matricola,
                        element.nome,
                        element.cognome,
                    ]);
                });
            });
        };
        return PaginaStudentComponent_1;
    }());
    __setFunctionName(_classThis, "PaginaStudentComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginaStudentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginaStudentComponent = _classThis;
}();
exports.PaginaStudentComponent = PaginaStudentComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

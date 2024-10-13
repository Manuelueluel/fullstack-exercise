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
exports.PaginaCorsoComponent = void 0;
var core_1 = require("@angular/core");
var corso_selectors_1 = require("../store/corso.selectors");
var corso_actions_1 = require("../store/corso.actions");
var PaginaCorsoComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-pagina-corso',
            templateUrl: './pagina-corso.component.html',
            styleUrls: ['./pagina-corso.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaginaCorsoComponent = _classThis = /** @class */ (function () {
        function PaginaCorsoComponent_1(serviceCorso, serviceIscrizioni, store) {
            var _this = this;
            this.serviceCorso = serviceCorso;
            this.serviceIscrizioni = serviceIscrizioni;
            this.store = store;
            this.active = 1;
            this.listaIscrizioniTabDisabled = true;
            this.selectedStudent = {
                id: -1,
                matricola: -1,
                nome: '',
                cognome: '',
            };
            this.selectedCorso = {
                id: -1,
                name: '',
                professor: '',
            };
            /*  Alla selezione di un corso nella tabella, quel corso viene inserito nello Store,
                sotto lo state 'corso'. Per prelevare dallo Store uno state è necessario usare
                un selector, dato che ero interessato solamente al nome del corso selezionato,
                ho utilizzato il selector per solo quella property dello state 'corso'.
                Il metodo select(selector) restituisce un Observable, in questo caso <string>
                che alla selezione del corso returna il nome del corso, così vado a modificare
                i titoli dei vari component che utlizzavano tale nome.
            */
            this.nomeCorsoSelezionato$ = this.store
                .select(corso_selectors_1.selectCorsoName)
                .subscribe(function (nomeCorso) {
                _this.titleModificaCorso = $localize(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Modify course ", ""], ["Modify course ", ""])), nomeCorso);
                _this.titleCancellaCorso = $localize(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Delete course ", ""], ["Delete course ", ""])), nomeCorso);
                _this.titleIscrizioniCorso = $localize(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", " course enrollments"], ["", " course enrollments"])), nomeCorso);
            });
            this.corsoTable = {
                headers: [$localize(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Id"], ["Id"]))), $localize(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Name"], ["Name"]))), $localize(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Professor"], ["Professor"])))],
                rows: [],
            };
            this.iscrizioniTable = {
                headers: [
                    $localize(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Id"], ["Id"]))),
                    $localize(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Badge number"], ["Badge number"]))),
                    $localize(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Name"], ["Name"]))),
                    $localize(templateObject_10 || (templateObject_10 = __makeTemplateObject(["Surname"], ["Surname"]))),
                ],
                rows: [],
            };
            this.titleCreaCorso = $localize(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Create course"], ["Create course"])));
            this.titleCorsiTable = $localize(templateObject_12 || (templateObject_12 = __makeTemplateObject(["Courses list"], ["Courses list"])));
            this.showCancellareIscrizione = false;
            this.showCancellaCorso = false;
            this.showIscrizioni = false;
            this.showUpdateCorso = false;
        }
        PaginaCorsoComponent_1.prototype.ngOnInit = function () {
            this.getCorsi();
        };
        //Crea un nuovo corso dalla form
        PaginaCorsoComponent_1.prototype.createCorsoEvent = function (corso) {
            var _this = this;
            //Non è necessario l'id, generato dal backend
            var newCorso = {
                name: corso[0],
                professor: corso[1],
            };
            this.serviceCorso.createCorso(newCorso).subscribe(function () { return _this.getCorsi(); });
        };
        //Seleziona un corso dalla tabella dei corsi
        PaginaCorsoComponent_1.prototype.selectCorsoEvent = function (corso) {
            this.selectedCorso.id = +corso[0];
            this.selectedCorso.name = corso[1];
            this.selectedCorso.professor = corso[2];
            this.store.dispatch(corso_actions_1.CorsoActions.selectCorso({ corso: this.selectedCorso }));
            this.showIscrizioni = true;
            this.showUpdateCorso = true;
            this.showCancellaCorso = true;
            this.listaIscrizioniTabDisabled = false;
            this.getIscrizioni(this.selectedCorso);
        };
        //Seleziona uno student dalla lista delle iscrizioni al corso selezionato
        PaginaCorsoComponent_1.prototype.selectStudentEvent = function (student) {
            this.selectedStudent.id = +student[0];
            this.selectedStudent.matricola = +student[1];
            this.selectedStudent.nome = student[2];
            this.selectedStudent.cognome = student[3];
            this.titleCancellaIscrizione = $localize(templateObject_13 || (templateObject_13 = __makeTemplateObject(["Unsubscribe ", " from course ", ""], ["Unsubscribe ", " from course ", ""])), this.selectedStudent.matricola, this.selectedCorso.name);
            this.showCancellareIscrizione = true;
        };
        PaginaCorsoComponent_1.prototype.hideCancellaCorso = function () {
            this.showCancellareIscrizione = false;
            this.showCancellaCorso = false;
            this.showUpdateCorso = false;
            this.showIscrizioni = false;
            this.listaIscrizioniTabDisabled = true;
        };
        PaginaCorsoComponent_1.prototype.hideCancellaIscrizione = function () {
            this.showCancellareIscrizione = false;
        };
        //fetch lista corsi
        PaginaCorsoComponent_1.prototype.getCorsi = function () {
            var _this = this;
            this.corsoTable.rows = [];
            this.serviceCorso.getCorsi().subscribe(function (corsi) {
                return corsi.forEach(function (element) {
                    _this.corsoTable.rows.push([
                        element.id,
                        element.name,
                        element.professor,
                    ]);
                });
            });
        };
        PaginaCorsoComponent_1.prototype.getIscrizioni = function (selectedCorso) {
            var _this = this;
            this.iscrizioniTable.rows = [];
            this.serviceIscrizioni
                .getIscrizioni(selectedCorso.id)
                .subscribe(function (iscrizioni) {
                return iscrizioni.forEach(function (element) {
                    _this.iscrizioniTable.rows.push([
                        element.id,
                        element.matricola,
                        element.nome,
                        element.cognome,
                    ]);
                });
            });
        };
        PaginaCorsoComponent_1.prototype.deleteIscrizione = function () {
            var _this = this;
            this.serviceIscrizioni
                .deleteIscrizione(this.selectedStudent.id, this.selectedCorso.id)
                .subscribe(function () { return _this.getIscrizioni(_this.selectedCorso); });
            this.hideCancellaIscrizione();
        };
        PaginaCorsoComponent_1.prototype.deleteCorso = function () {
            var _this = this;
            this.serviceCorso
                .deleteCorso(this.selectedCorso.id)
                .subscribe(function () { return _this.getCorsi(); });
            this.hideCancellaCorso();
        };
        //Update corso dalla form
        PaginaCorsoComponent_1.prototype.updateCorso = function (corso) {
            var _this = this;
            var corsoUpdated = {
                name: corso[0],
                professor: corso[1],
            };
            this.serviceCorso
                .updateCorso(this.selectedCorso.id, corsoUpdated)
                .subscribe(function () { return _this.getCorsi(); });
            this.showUpdateCorso = false;
        };
        return PaginaCorsoComponent_1;
    }());
    __setFunctionName(_classThis, "PaginaCorsoComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginaCorsoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginaCorsoComponent = _classThis;
}();
exports.PaginaCorsoComponent = PaginaCorsoComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;

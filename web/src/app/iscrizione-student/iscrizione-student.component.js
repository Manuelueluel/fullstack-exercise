"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IscrizioneStudentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var name_validator_directive_1 = require("../custom-validators/name-validator.directive");
var corso_validator_directive_1 = require("../custom-validators/corso-validator.directive");
var rxjs_1 = require("rxjs");
var student_selectors_1 = require("../store/student.selectors");
var IscrizioneStudentComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-iscrizione-student',
            templateUrl: './iscrizione-student.component.html',
            styleUrls: ['./iscrizione-student.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var IscrizioneStudentComponent = _classThis = /** @class */ (function () {
        function IscrizioneStudentComponent_1(formBuilder, iscrizioneService, corsoService, studentService, matricolaSuggestionsValidator, store) {
            this.formBuilder = (__runInitializers(this, _instanceExtraInitializers), formBuilder);
            this.iscrizioneService = iscrizioneService;
            this.corsoService = corsoService;
            this.studentService = studentService;
            this.matricolaSuggestionsValidator = matricolaSuggestionsValidator;
            this.store = store;
            this.title = __runInitializers(this, _title_initializers, void 0);
        }
        IscrizioneStudentComponent_1.prototype.ngAfterViewInit = function () {
            //Gli event listener a componenti vanno inizialzzati qui
        };
        IscrizioneStudentComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.formBuilder.group({
                matricola: new forms_1.FormControl('', {
                    validators: [forms_1.Validators.required],
                    asyncValidators: [
                        this.matricolaSuggestionsValidator.validate.bind(this.matricolaSuggestionsValidator),
                    ],
                }),
                nome: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, name_validator_directive_1.nameValidator])),
                cognome: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, name_validator_directive_1.nameValidator])),
                corso: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, corso_validator_directive_1.corsoValidator])),
                professor: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, name_validator_directive_1.nameValidator])),
            });
            //Fetch suggerimenti nomi dei corsi
            this.corsiSuggestions = [];
            this.corsiSuggestionSubscription = this.corsoService
                .getCorsi()
                .subscribe(function (corsi) {
                corsi.forEach(function (corso) {
                    _this.corsiSuggestions.push(corso.name);
                });
            });
            //Fetch suggerimenti matricole dallo store
            this.matricolaSuggestions = [];
            this.matricolaSuggestionSubscription = this.store
                .select(student_selectors_1.suggestetedMatricola)
                .subscribe(function (matricole) {
                _this.matricolaSuggestions = [];
                matricole.forEach(function (matricola) {
                    _this.matricolaSuggestions.push(matricola);
                });
            });
        };
        IscrizioneStudentComponent_1.prototype.fetchMatricolaSuggestions = function (value) {
            return this.studentService.getSuggestions(+value).pipe(
            //debounceTime(2000),
            //studentService.getSuggestions retorna un tipo Observable<Student[]>, tale observable emette array di student
            //è possibile modificare il tipo returnato se nella pipe si va a modificare gli array emessi
            //mappo su ogni array di student una mappa che per student preleva solamente la matricola string, avendo così string[]
            //come return
            (0, rxjs_1.map)(function (students) {
                return students.map(function (student) { return "".concat(student.matricola); });
            }));
        };
        Object.defineProperty(IscrizioneStudentComponent_1.prototype, "matricola", {
            get: function () {
                return this.form.get('matricola');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IscrizioneStudentComponent_1.prototype, "nome", {
            get: function () {
                return this.form.get('nome');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IscrizioneStudentComponent_1.prototype, "cognome", {
            get: function () {
                return this.form.get('cognome');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IscrizioneStudentComponent_1.prototype, "corso", {
            get: function () {
                return this.form.get('corso');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IscrizioneStudentComponent_1.prototype, "professore", {
            get: function () {
                return this.form.get('professor');
            },
            enumerable: false,
            configurable: true
        });
        IscrizioneStudentComponent_1.prototype.onSubmit = function () {
            var studentCorso = {
                student: {
                    matricola: this.form.value.matricola,
                    nome: this.form.value.nome,
                    cognome: this.form.value.cognome,
                },
                corso: {
                    name: this.form.value.corso,
                    professor: this.form.value.professor,
                },
            };
            this.iscrizioneService.iscriviStudente(studentCorso).subscribe();
        };
        IscrizioneStudentComponent_1.prototype.ngOnDestroy = function () {
            this.corsiSuggestionSubscription.unsubscribe();
            this.matricolaSuggestionSubscription.unsubscribe();
        };
        return IscrizioneStudentComponent_1;
    }());
    __setFunctionName(_classThis, "IscrizioneStudentComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IscrizioneStudentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IscrizioneStudentComponent = _classThis;
}();
exports.IscrizioneStudentComponent = IscrizioneStudentComponent;

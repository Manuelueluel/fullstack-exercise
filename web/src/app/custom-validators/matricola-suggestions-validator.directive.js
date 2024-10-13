"use strict";
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
exports.MatricolaSuggestionsValidatorDirective = exports.MatricolaSuggestionsValidator = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var student_actions_1 = require("../store/student.actions");
var MatricolaSuggestionsValidator = function () {
    var _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MatricolaSuggestionsValidator = _classThis = /** @class */ (function () {
        function MatricolaSuggestionsValidator_1(studentService, store) {
            this.studentService = studentService;
            this.store = store;
        }
        /**
         *  La validazione del campo dell'input viene fatta confrontandola con i valori che
         * vengono fetched dal backend, se combaciano allora valida l'input
         * { matricolaInvalid: { value: control.value } } altrimenti
         * @param control
         * @returns
         */
        MatricolaSuggestionsValidator_1.prototype.validate = function (control) {
            var _this = this;
            return this.studentService.getSuggestions(control.value).pipe((0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.map)(function (suggestions) {
                var found = false;
                //salvo nello store la lista degli studenti
                _this.store.dispatch(student_actions_1.StudentActions.suggestetedStudents({ students: suggestions }));
                for (var _i = 0, suggestions_1 = suggestions; _i < suggestions_1.length; _i++) {
                    var suggestion = suggestions_1[_i];
                    if (suggestion.matricola === control.value)
                        found = true;
                }
                return found ? null : { matricolaInvalid: { value: control.value } };
            }));
        };
        MatricolaSuggestionsValidator_1.prototype.registerOnValidatorChange = function (fn) {
            throw new Error('Method not implemented.');
        };
        return MatricolaSuggestionsValidator_1;
    }());
    __setFunctionName(_classThis, "MatricolaSuggestionsValidator");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MatricolaSuggestionsValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MatricolaSuggestionsValidator = _classThis;
}();
exports.MatricolaSuggestionsValidator = MatricolaSuggestionsValidator;
var MatricolaSuggestionsValidatorDirective = function () {
    var _classDecorators = [(0, core_1.Directive)({
            selector: '[appMatricolaSuggestionsValidator]',
            providers: [
                {
                    provide: forms_1.NG_ASYNC_VALIDATORS,
                    useExisting: MatricolaSuggestionsValidatorDirective,
                    multi: true,
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MatricolaSuggestionsValidatorDirective = _classThis = /** @class */ (function () {
        function MatricolaSuggestionsValidatorDirective_1(matricolaSuggestionsValidator) {
            this.matricolaSuggestionsValidator = matricolaSuggestionsValidator;
        }
        MatricolaSuggestionsValidatorDirective_1.prototype.validate = function (control) {
            return this.matricolaSuggestionsValidator.validate(control);
        };
        MatricolaSuggestionsValidatorDirective_1.prototype.registerOnValidatorChange = function (fn) {
            throw new Error('Method not implemented.');
        };
        return MatricolaSuggestionsValidatorDirective_1;
    }());
    __setFunctionName(_classThis, "MatricolaSuggestionsValidatorDirective");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MatricolaSuggestionsValidatorDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MatricolaSuggestionsValidatorDirective = _classThis;
}();
exports.MatricolaSuggestionsValidatorDirective = MatricolaSuggestionsValidatorDirective;

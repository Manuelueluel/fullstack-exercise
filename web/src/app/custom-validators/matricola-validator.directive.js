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
exports.MatricolaValidatorDirective = exports.matricolaValidator = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var matricolaValidator = function (control) {
    var nameRegex = new RegExp(/[^\d]+/);
    var notValid = nameRegex.test(control.value);
    return notValid ? { matricolaInvalid: { value: control.value } } : null;
};
exports.matricolaValidator = matricolaValidator;
var MatricolaValidatorDirective = function () {
    var _classDecorators = [(0, core_1.Directive)({
            selector: '[appMatricolaValidator]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: MatricolaValidatorDirective,
                    multi: true,
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _matricolaValidator_decorators;
    var _matricolaValidator_initializers = [];
    var MatricolaValidatorDirective = _classThis = /** @class */ (function () {
        function MatricolaValidatorDirective_1() {
            this.matricolaValidator = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _matricolaValidator_initializers, ''));
        }
        MatricolaValidatorDirective_1.prototype.validate = function (control) {
            return this.matricolaValidator ? (0, exports.matricolaValidator)(control) : null;
            // return matricolaValidator(control);
        };
        MatricolaValidatorDirective_1.prototype.registerOnValidatorChange = function (fn) {
            throw new Error('Method not implemented.');
        };
        return MatricolaValidatorDirective_1;
    }());
    __setFunctionName(_classThis, "MatricolaValidatorDirective");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _matricolaValidator_decorators = [(0, core_1.Input)('appMatricolaValidator')];
        __esDecorate(null, null, _matricolaValidator_decorators, { kind: "field", name: "matricolaValidator", static: false, private: false, access: { has: function (obj) { return "matricolaValidator" in obj; }, get: function (obj) { return obj.matricolaValidator; }, set: function (obj, value) { obj.matricolaValidator = value; } }, metadata: _metadata }, _matricolaValidator_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MatricolaValidatorDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MatricolaValidatorDirective = _classThis;
}();
exports.MatricolaValidatorDirective = MatricolaValidatorDirective;
// export class MatricolaValidatorDirective implements Validator {
//   @Input('appMatricolaValidator') matricolaValidator = '';
//   constructor() {}
//   validate(control: AbstractControl<any, any>): ValidationErrors | null {
//     return this.matricolaValidator ? matricolaValidator(control) : null;
//     // return matricolaValidator(control);
//   }
//   registerOnValidatorChange?(fn: () => void): void {
//     throw new Error('Method not implemented.');
//   }
// }

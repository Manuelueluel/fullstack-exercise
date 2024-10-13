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
exports.CustomInputComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var CustomInputComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-custom-input',
            templateUrl: './custom-input.component.html',
            styleUrls: ['./custom-input.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: (0, core_1.forwardRef)(function () { return CustomInputComponent; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: (0, core_1.forwardRef)(function () { return CustomInputComponent; }),
                    multi: true,
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomInputComponent = _classThis = /** @class */ (function () {
        function CustomInputComponent_1(studentService) {
            this.studentService = studentService;
            this.disabled = false;
            this.onChange = function (value) { };
            this.onTouched = function () { };
        }
        // getSuggestions( suggestions: string[] | (() => string[])){
        //   this.suggestions = suggestions;
        // }
        CustomInputComponent_1.prototype.validate = function (control) {
            return this.studentService.getSuggestions(control.value).pipe((0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.map)(function (suggestions) {
                var found = false;
                for (var _i = 0, suggestions_1 = suggestions; _i < suggestions_1.length; _i++) {
                    var suggestion = suggestions_1[_i];
                    if (suggestion.matricola === control.value)
                        found = true;
                }
                return found ? null : { matricolaInvalid: { value: control.value } };
            }));
        };
        CustomInputComponent_1.prototype.registerOnValidatorChange = function (fn) {
            throw new Error('Method not implemented.');
        };
        CustomInputComponent_1.prototype.writeValue = function (obj) {
            this.value = obj;
        };
        CustomInputComponent_1.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        CustomInputComponent_1.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        CustomInputComponent_1.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        return CustomInputComponent_1;
    }());
    __setFunctionName(_classThis, "CustomInputComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomInputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomInputComponent = _classThis;
}();
exports.CustomInputComponent = CustomInputComponent;

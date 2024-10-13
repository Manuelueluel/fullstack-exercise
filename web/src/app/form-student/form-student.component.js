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
exports.FormStudentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var name_validator_directive_1 = require("../custom-validators/name-validator.directive");
var matricola_validator_directive_1 = require("../custom-validators/matricola-validator.directive");
var FormStudentComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-form-student',
            templateUrl: './form-student.component.html',
            styleUrls: ['./form-student.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _notify_decorators;
    var _notify_initializers = [];
    var FormStudentComponent = _classThis = /** @class */ (function () {
        function FormStudentComponent_1(formBuilder) {
            this.formBuilder = (__runInitializers(this, _instanceExtraInitializers), formBuilder);
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.notify = __runInitializers(this, _notify_initializers, new core_1.EventEmitter());
        }
        FormStudentComponent_1.prototype.ngOnInit = function () {
            //Definizione del form
            this.form = this.formBuilder.group({
                matricola: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, matricola_validator_directive_1.matricolaValidator])),
                nome: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, name_validator_directive_1.nameValidator])),
                cognome: this.formBuilder.control('', forms_1.Validators.compose([forms_1.Validators.required, name_validator_directive_1.nameValidator])),
            });
        };
        Object.defineProperty(FormStudentComponent_1.prototype, "matricola", {
            get: function () {
                return this.form.get('matricola');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormStudentComponent_1.prototype, "nome", {
            get: function () {
                return this.form.get('nome');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormStudentComponent_1.prototype, "cognome", {
            get: function () {
                return this.form.get('cognome');
            },
            enumerable: false,
            configurable: true
        });
        //Invia evento al parent
        FormStudentComponent_1.prototype.sendEvent = function (student) {
            this.notify.emit(student);
        };
        FormStudentComponent_1.prototype.onSubmit = function () {
            this.sendEvent([
                this.form.value.matricola,
                this.form.value.nome,
                this.form.value.cognome,
            ]);
            this.form.reset();
        };
        return FormStudentComponent_1;
    }());
    __setFunctionName(_classThis, "FormStudentComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, core_1.Input)()];
        _notify_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _notify_decorators, { kind: "field", name: "notify", static: false, private: false, access: { has: function (obj) { return "notify" in obj; }, get: function (obj) { return obj.notify; }, set: function (obj, value) { obj.notify = value; } }, metadata: _metadata }, _notify_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormStudentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormStudentComponent = _classThis;
}();
exports.FormStudentComponent = FormStudentComponent;

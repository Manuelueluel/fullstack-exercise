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
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var form_student_component_1 = require("./form-student/form-student.component");
var form_corso_component_1 = require("./form-corso/form-corso.component");
var http_1 = require("@angular/common/http");
var tabella_component_1 = require("./tabella/tabella.component");
var pagina_student_component_1 = require("./pagina-student/pagina-student.component");
var pagina_corso_component_1 = require("./pagina-corso/pagina-corso.component");
var iscrizione_student_component_1 = require("./iscrizione-student/iscrizione-student.component");
var accept_deny_component_1 = require("./accept-deny/accept-deny.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var name_validator_directive_1 = require("./custom-validators/name-validator.directive");
var matricola_validator_directive_1 = require("./custom-validators/matricola-validator.directive");
var navbar_component_1 = require("./navbar/navbar.component");
var store_1 = require("@ngrx/store");
var corso_reducer_1 = require("./store/corso.reducer");
var student_reducer_1 = require("./store/student.reducer");
var students_reducer_1 = require("./store/students.reducer");
var custom_input_component_1 = require("./custom-input/custom-input.component");
var AppModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                form_student_component_1.FormStudentComponent,
                form_corso_component_1.FormCorsoComponent,
                tabella_component_1.TabellaComponent,
                pagina_student_component_1.PaginaStudentComponent,
                pagina_corso_component_1.PaginaCorsoComponent,
                iscrizione_student_component_1.IscrizioneStudentComponent,
                accept_deny_component_1.AcceptDenyComponent,
                name_validator_directive_1.NameValidatorDirective,
                matricola_validator_directive_1.MatricolaValidatorDirective,
                navbar_component_1.NavbarComponent,
                custom_input_component_1.CustomInputComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule,
                store_1.StoreModule.forRoot({
                    corso: corso_reducer_1.corsoReducer,
                    student: student_reducer_1.studentReducer,
                    students: students_reducer_1.studentsReducer,
                }),
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;

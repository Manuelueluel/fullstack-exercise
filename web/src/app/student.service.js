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
exports.StudentService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var environment_1 = require("./environment");
var api_paths_1 = require("./api-paths");
var StudentService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StudentService = _classThis = /** @class */ (function () {
        function StudentService_1(http) {
            this.http = http;
            this.httpOptions = {
                headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }),
            };
        }
        StudentService_1.prototype.getStudent = function (id) {
            return this.http
                .get("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.student, "/").concat(id), this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        //Ottiene una lista di Student che combaciano con la matricola anche parziale passata
        StudentService_1.prototype.getSuggestions = function (matricola) {
            return this.http
                .get("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.student, "/getByMatricola?matricola=").concat(matricola), this.httpOptions)
                .pipe((0, rxjs_1.delay)(500), (0, rxjs_1.catchError)(this.handleError));
        };
        StudentService_1.prototype.getStudents = function () {
            return this.http
                .get("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.student), this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        StudentService_1.prototype.createStudent = function (student) {
            return this.http
                .post("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.student), student, this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        StudentService_1.prototype.updateStudent = function (id, student) {
            return this.http
                .put("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.student, "/").concat(id), student, this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        StudentService_1.prototype.deleteStudent = function (id) {
            return this.http
                .delete("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.student, "/").concat(id), this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        StudentService_1.prototype.handleError = function (error) {
            if (error.status >= 400 && error.status < 500) {
                // A client-side or network error occurred. Handle it accordingly.
                alert("An error occurred: ".concat(error.error));
            }
            if (error.status >= 500 || error.status < 400) {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong.
                console.error("Backend returned code ".concat(error.status, ", body was: "), error.error);
                //Con codice < 300, qualcosa è andato storto nel codice
            }
            // Return an observable with a user-facing error message.
            return (0, rxjs_1.throwError)(function () { return new Error('Something bad happened; please try again later.'); });
        };
        return StudentService_1;
    }());
    __setFunctionName(_classThis, "StudentService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StudentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StudentService = _classThis;
}();
exports.StudentService = StudentService;

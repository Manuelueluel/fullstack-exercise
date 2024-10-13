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
exports.CorsoService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("./environment");
var api_paths_1 = require("./api-paths");
var CorsoService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CorsoService = _classThis = /** @class */ (function () {
        function CorsoService_1(http) {
            this.http = http;
            this.httpOptions = {
                headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }),
            };
        }
        /*  https://angular.io/api/common/http/HttpClient#get
          "Constructs an observable that, when subscribed, causes the configured GET request
          to execute on the server. See the individual overloads for details on the return type."
          È necessaria la subscribe?
        */
        CorsoService_1.prototype.getCorso = function (id) {
            return this.http
                .get("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.corso, "/").concat(id), this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        CorsoService_1.prototype.getCorsi = function () {
            return this.http
                .get("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.corso), this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        CorsoService_1.prototype.createCorso = function (corso) {
            return this.http
                .post("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.corso), corso, this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        CorsoService_1.prototype.updateCorso = function (id, corso) {
            return this.http
                .put("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.corso, "/").concat(id), corso, this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        CorsoService_1.prototype.deleteCorso = function (id) {
            return this.http
                .delete("".concat(environment_1.Environment.apiUrl, "/").concat(api_paths_1.ApiPaths.corso, "/").concat(id), this.httpOptions)
                .pipe((0, rxjs_1.catchError)(this.handleError));
        };
        //vedi per gestione errori https://angular.io/guide/http-handle-request-errors
        CorsoService_1.prototype.handleError = function (error) {
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
        return CorsoService_1;
    }());
    __setFunctionName(_classThis, "CorsoService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CorsoService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CorsoService = _classThis;
}();
exports.CorsoService = CorsoService;

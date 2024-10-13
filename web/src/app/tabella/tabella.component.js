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
exports.TabellaComponent = void 0;
var core_1 = require("@angular/core");
var TabellaComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-tabella',
            templateUrl: './tabella.component.html',
            styleUrls: ['./tabella.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _headers_decorators;
    var _headers_initializers = [];
    var _rows_decorators;
    var _rows_initializers = [];
    var _notify_decorators;
    var _notify_initializers = [];
    var TabellaComponent = _classThis = /** @class */ (function () {
        function TabellaComponent_1() {
            this.title = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.headers = __runInitializers(this, _headers_initializers, void 0);
            this.rows = __runInitializers(this, _rows_initializers, void 0);
            this.notify = __runInitializers(this, _notify_initializers, new core_1.EventEmitter());
        }
        TabellaComponent_1.prototype.rowEvent = function ($event, row) {
            //Tolgo la classe css da tutte le row non selezionate
            var lista = document.querySelectorAll('tr');
            lista.forEach(function (node) {
                node.classList.remove('rowSelected');
            });
            //Aggiungo la classe css alla row selezionata
            $event.target.parentElement.classList.add('rowSelected');
            this.notify.emit(row);
        };
        return TabellaComponent_1;
    }());
    __setFunctionName(_classThis, "TabellaComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, core_1.Input)()];
        _headers_decorators = [(0, core_1.Input)()];
        _rows_decorators = [(0, core_1.Input)()];
        _notify_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _headers_decorators, { kind: "field", name: "headers", static: false, private: false, access: { has: function (obj) { return "headers" in obj; }, get: function (obj) { return obj.headers; }, set: function (obj, value) { obj.headers = value; } }, metadata: _metadata }, _headers_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rows_decorators, { kind: "field", name: "rows", static: false, private: false, access: { has: function (obj) { return "rows" in obj; }, get: function (obj) { return obj.rows; }, set: function (obj, value) { obj.rows = value; } }, metadata: _metadata }, _rows_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _notify_decorators, { kind: "field", name: "notify", static: false, private: false, access: { has: function (obj) { return "notify" in obj; }, get: function (obj) { return obj.notify; }, set: function (obj, value) { obj.notify = value; } }, metadata: _metadata }, _notify_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TabellaComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TabellaComponent = _classThis;
}();
exports.TabellaComponent = TabellaComponent;

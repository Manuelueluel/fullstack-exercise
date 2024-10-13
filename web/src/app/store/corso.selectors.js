"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCorsoName = exports.selectCorso = void 0;
var store_1 = require("@ngrx/store");
exports.selectCorso = (0, store_1.createFeatureSelector)('corso');
exports.selectCorsoName = (0, store_1.createSelector)(exports.selectCorso, function (corso) {
    return corso.name;
});

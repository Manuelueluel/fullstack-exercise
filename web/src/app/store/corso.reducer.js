"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsoReducer = void 0;
var store_1 = require("@ngrx/store");
var corso_actions_1 = require("./corso.actions");
var initialState = {
    name: 'Algo',
    professor: 'Monty',
};
exports.corsoReducer = (0, store_1.createReducer)(initialState, (0, store_1.on)(corso_actions_1.CorsoActions.selectCorso, function (state, selectedCorso) {
    return selectedCorso.corso;
}));

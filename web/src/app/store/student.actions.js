"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentActions = void 0;
var store_1 = require("@ngrx/store");
var store_2 = require("@ngrx/store");
//The props method is used to define any additional
//metadata needed for the handling of the action
//Si usa la createAction per returnare una Action quando la si dispatcha
//createActionGroup crea più azioni da una sola fonte
exports.StudentActions = (0, store_1.createActionGroup)({
    source: 'Student',
    events: {
        'Select Student': (0, store_2.props)(),
        'Suggesteted Students': (0, store_2.props)(),
    },
});

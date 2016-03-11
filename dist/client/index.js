"use strict";
var index_1 = require("./actions/index");
var accounts_1 = require("./configs/method_stubs/accounts");
var accounts_config_1 = require("./configs/accounts_config");
var i18n_1 = require("./configs/i18n");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    actions: index_1.default,
    load: function (context) {
        accounts_1.default(context);
        accounts_config_1.default(context);
        i18n_1.default(context);
    }
};

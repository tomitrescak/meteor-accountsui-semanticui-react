"use strict";
var mantra_core_1 = require("mantra-core");
var logged_user_view_1 = require("../components/logged_user_view");
exports.composer = function (_a, onData) {
    var context = _a.context, showUserName = _a.showUserName;
    var Meteor = context.Meteor, i18n = context.i18n;
    onData(null, {
        userName: showUserName ? Meteor.user().profile.name : "",
        context: context
    });
    return null;
};
exports.depsMapper = function (context, actions) { return ({
    signOut: actions.accounts.signOut
}); };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mantra_core_1.composeAll(mantra_core_1.composeWithTracker(exports.composer), mantra_core_1.useDeps(exports.depsMapper))(logged_user_view_1.default);

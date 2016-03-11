"use strict";
var mantra_core_1 = require("mantra-core");
var accounts_root_view_1 = require("../components/accounts_root_view");
var accounts_1 = require("../actions/accounts");
exports.composer = function (_a, onData) {
    var context = _a.context;
    var Session = context.Session, i18n = context.i18n;
    var viewType = Session.get(accounts_1.VIEWKEY);
    if (!viewType) {
        viewType = "signIn";
    }
    var __ = i18n.translate;
    onData(null, {
        viewType: viewType,
        alerts: Session.get(accounts_1.ERRORKEY) ? __(Session.get(accounts_1.ERRORKEY)) : null,
        infos: Session.get(accounts_1.MESSAGEKEY) ? __(Session.get(accounts_1.MESSAGEKEY)) : null,
        context: context
    });
    return null;
};
exports.depsMapper = function (context, actions) { return ({
    clearMessages: actions.accounts.clearMessages,
    emailResetLink: actions.accounts.emailResetLink,
    signIn: actions.accounts.signIn,
    signOut: actions.accounts.signOut,
    emailVerification: actions.accounts.resendVerification,
    resetPassword: actions.accounts.resetPassword,
    showForgotPassword: actions.accounts.showForgotPassword,
    showResendVerification: actions.accounts.showResendVerification,
    showRegister: actions.accounts.showRegister,
    showSignIn: actions.accounts.showSignIn,
    register: actions.accounts.register,
    context: context
}); };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mantra_core_1.composeAll(mantra_core_1.composeWithTracker(exports.composer), mantra_core_1.useDeps(exports.depsMapper))(accounts_root_view_1.default);

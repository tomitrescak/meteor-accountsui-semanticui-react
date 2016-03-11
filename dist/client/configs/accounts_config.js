"use strict";
var accounts_base_1 = require("meteor/accounts-base");
var accounts_1 = require("../actions/accounts");
var i18n_client_1 = require("i18n-client");
function default_1(context) {
    var Session = context.Session;
    // configure accounts
    console.log("Configuring accounts ...");
    delete accounts_base_1.Accounts["_accountsCallbacks"]["reset-password"];
    accounts_base_1.Accounts.onResetPasswordLink(function (token, done) {
        Session.set(accounts_1.VIEWKEY, "resetPassword");
        Session.set(accounts_1.TOKENKEY, token);
    });
    delete accounts_base_1.Accounts["_accountsCallbacks"]["verify-email"];
    accounts_base_1.Accounts.onEmailVerificationLink(function (token, done) {
        accounts_base_1.Accounts.verifyEmail(token, function (err) {
            if (err != null) {
                if (err.message = "Verify email link expired [403]") {
                    Session.set(accounts_1.ERRORKEY, i18n_client_1.__("accounts.error.loginTokenExpired"));
                }
            }
            else {
                Session.set(accounts_1.ERRORKEY, i18n_client_1.__("accounts.messages.emailVerified"));
                done();
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;

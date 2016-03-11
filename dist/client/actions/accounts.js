"use strict";
var accounts_base_1 = require("meteor/accounts-base");
exports.VIEWKEY = "ACCOUNTS_VIEWTYPE";
exports.ERRORKEY = "ACCOUNTS_ERROR";
exports.MESSAGEKEY = "ACCOUNTS_MESSAGE";
exports.TOKENKEY = "ACCOUNT_TOKEN";
function trimInput(value) {
    return value.replace(/^\s*|\s*$/g, "");
}
;
function isNotEmpty(value) {
    if (value && value !== "") {
        return true;
    }
    showError("accounts.error.requiredFields");
    return false;
}
;
function isEmail(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    showError("accounts.error.invalidEmail");
    return false;
}
;
function isValidPassword(password) {
    if (password.length < 7) {
        showError("accounts.error.minChar7");
        return false;
    }
    return true;
}
;
function areValidPasswords(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        showError("accounts.error.differentPasswords");
        return false;
    }
    return true;
}
;
var localState;
function showError(message) {
    debugger;
    localState.set(exports.ERRORKEY, message);
}
function showInfo(message) {
    debugger;
    localState.set(exports.MESSAGEKEY, message);
}
function clearMessages() {
    showError(null);
    showInfo(null);
}
var Actions = {
    clearMessages: function (ctx) {
        localState = ctx.Session;
        clearMessages();
    },
    signIn: function (_a, email, password, callback, e) {
        var Meteor = _a.Meteor, __ = _a.__;
        clearMessages();
        email = trimInput(email.toLowerCase());
        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            // $("#signInForm").addClass("loading");
            Meteor.loginWithPassword(email, password, function (err) {
                callback();
                // $("#signInForm").removeClass("loading");
                if (err) {
                    showError("accounts.error.invalidCredentials");
                }
                else {
                }
            });
        }
        return false;
    },
    emailResetLink: function (_a, email, callback) {
        var __ = _a.__;
        clearMessages();
        if (isNotEmpty(email) && isEmail(email)) {
            accounts_base_1.Accounts.forgotPassword({ email: email }, function (err) {
                callback();
                if (err) {
                    if (err.message === "User not found [403]") {
                        showError("accounts.error.emailNotFound");
                    }
                    else {
                        showError("accounts.error.unknownError");
                    }
                }
                else {
                    showInfo("accounts.messages.passwordResetEmailSent");
                }
            });
        }
        return false;
    },
    resetPassword: function (_a, password, passwordConfirm) {
        var __ = _a.__, Session = _a.Session;
        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            var token = Session.get(exports.TOKENKEY);
            accounts_base_1.Accounts.resetPassword(token, password, function (err) {
                if (err) {
                    if (err.message === "Token expired [403]") {
                        showError("accounts.error.tokenExpired");
                    }
                    else {
                        showError(err.message);
                    }
                }
                else {
                    showInfo("accounts.messages.passwordChanged");
                    Session.set(exports.TOKENKEY, null);
                    Session.set(exports.VIEWKEY, "signIn");
                }
            });
        }
    },
    register: function (_a, name, email, password, passwordConfirm, callback) {
        var __ = _a.__, Meteor = _a.Meteor, Session = _a.Session;
        clearMessages();
        var data = {
            email: email,
            password: password,
            profile: {
                name: name
            }
        };
        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
            Meteor.call("addUser", data, function (err, id) {
                callback();
                if (err) {
                    if (err.message === "Email already exists. [403]") {
                        showError("accounts.error.emailAlreadyExists");
                    }
                    else if (err.message === "Email doesn\"t match the criteria. [403]") {
                        showError("accounts.error.emailLimited");
                    }
                    else if (err.message === "Login forbidden [403]") {
                        showInfo("accounts.error.loginForbidden");
                        Session.set(exports.VIEWKEY, null);
                    }
                    else {
                        showError("accounts.error.unknownError");
                    }
                }
                else {
                    showInfo("accounts.messages.verificationSent");
                }
            });
        }
        return false;
    },
    resendVerification: function (_a, email, callback) {
        var __ = _a.__, Meteor = _a.Meteor;
        clearMessages();
        if (isNotEmpty(email) && isEmail(email)) {
            Meteor.call("sendVerification", email, function (err) {
                callback();
                if (err) {
                    if (err.message === "User not found [403]") {
                        showError("accounts.error.emailNotFound");
                    }
                    if (err.message === "User already verified [403]") {
                        showError("accounts.error.userAlreadyVerified");
                    }
                    else {
                        showError("accounts.error.unknownError");
                    }
                }
                else {
                    showInfo("accounts.messages.verificationEmailSent");
                }
            });
        }
    },
    signOut: function (_a) {
        var Meteor = _a.Meteor;
        Meteor.logout(function () {
            // Session.set("alert", "Bye Meteorite! Come back whenever you want!");
        });
    },
    showSignIn: function (_a) {
        var Session = _a.Session;
        Session.set(exports.VIEWKEY, "signIn");
    },
    showResendVerification: function (_a) {
        var Session = _a.Session;
        Session.set(exports.VIEWKEY, "resendVerification");
    },
    showRegister: function (_a) {
        var Session = _a.Session;
        Session.set(exports.VIEWKEY, "register");
    },
    showForgotPassword: function (_a) {
        var Session = _a.Session;
        Session.set(exports.VIEWKEY, "forgotPassword");
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Actions;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var ResetPassword = (function (_super) {
    __extends(ResetPassword, _super);
    function ResetPassword() {
        _super.apply(this, arguments);
    }
    ResetPassword.prototype.resetPassword = function () {
        if ($("#resetPassword").hasClass("loading")) {
            return;
        }
        $("#resetPasswordForm").form("validate form");
        if (!$("#resetPasswordForm").form("is valid")) {
            return;
        }
        $("#resetPassword").addClass("loading");
        var pass1 = this.refs["password"]["value"];
        var pass2 = this.refs["password-again"]["value"];
        this.props.resetPassword(pass1, pass2, function () {
            $("#resetPassword").removeClass("loading");
        });
    };
    ResetPassword.prototype.render = function () {
        this.context = this.props.context;
        var mf = this.props.context.i18n.initTranslator("accounts");
        return (React.createElement("div", {className: "ui form login", id: "resetPasswordForm"}, 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("password")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "password", placeholder: mf("password"), ref: "password", id: "password"}), 
                    React.createElement("i", {className: "lock icon"}))), 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("passwordAgain")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "password", placeholder: mf("passwordAgain"), ref: "password-again", id: "password-again"}), 
                    React.createElement("i", {className: "lock icon"}))), 
            React.createElement("div", {className: "ui equal width center aligned grid"}, 
                React.createElement("div", {className: "first column"}, 
                    React.createElement("div", {className: "ui red submit button", id: "resetPassword", onClick: this.resetPassword.bind(this)}, mf("resetYourPassword"))
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "Or"), 
                React.createElement("div", {className: "center aligned column"}, 
                    React.createElement("div", {className: "green ui labeled icon button", onClick: this.props.showSignIn}, 
                        React.createElement("i", {className: "sign in icon"}), 
                        mf("signIn"))
                ))));
    };
    ResetPassword.prototype.componentDidMount = function () {
        var mf = this.context.i18n.initTranslator("accounts");
        this.props.clearMessages();
        $(".ui.form")
            .form({
            inline: true,
            fields: {
                password: {
                    identifier: "password",
                    rules: [
                        {
                            type: "empty",
                            prompt: mf("error.passwordRequired")
                        },
                        {
                            type: "length[7]",
                            prompt: mf("error.minChar7")
                        }
                    ]
                },
                passwordConfirm: {
                    identifier: "password-again",
                    rules: [
                        {
                            type: "match[password]",
                            prompt: mf("error.pwdsDontMatch")
                        }
                    ]
                }
            }
        });
    };
    return ResetPassword;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResetPassword;

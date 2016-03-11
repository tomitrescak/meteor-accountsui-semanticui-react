"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var ForgotPassword = (function (_super) {
    __extends(ForgotPassword, _super);
    function ForgotPassword() {
        _super.apply(this, arguments);
    }
    ForgotPassword.prototype.emailResetLink = function () {
        if ($("#emailButton").hasClass("loading")) {
            return;
        }
        $("#forgotPasswordForm").form("validate form");
        if (!$("#forgotPasswordForm").form("is valid")) {
            return;
        }
        $("#emailButton").addClass("loading");
        var email = this.refs["email"]["value"];
        this.props.emailResetLink(email, function () {
            $("#emailButton").removeClass("loading");
        });
    };
    ForgotPassword.prototype.render = function () {
        var mf = this.props.context.i18n.initTranslator("accounts");
        return (React.createElement("div", {id: "forgotPasswordForm", className: "ui login form"}, 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("email")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "text", placeholder: mf("emailAddress"), id: "email", ref: "email"}), 
                    React.createElement("i", {className: "mail icon"}))), 
            React.createElement("div", {className: "ui equal width center aligned grid"}, 
                React.createElement("div", {className: "first column"}, 
                    React.createElement("div", {className: "primary submit icon labeled ui button", id: "emailButton", onClick: this.emailResetLink.bind(this)}, 
                        React.createElement("i", {className: "icon mail"}), 
                        mf("emailResetLink"))
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "Or"), 
                React.createElement("div", {className: "last column"}, 
                    React.createElement("div", {className: "green ui labeled icon button", id: "signInButton", onClick: this.props.showSignIn.bind(this)}, 
                        React.createElement("i", {className: "sign in icon"}), 
                        mf("signIn"))
                ))));
    };
    ForgotPassword.prototype.componentDidMount = function () {
        this.props.clearMessages();
        var mf = this.props.context.i18n.initTranslator("accounts");
        $(".ui.form")
            .form({
            inline: true,
            fields: {
                username: {
                    identifier: "email",
                    rules: [
                        {
                            type: "empty",
                            prompt: mf("error.emailRequired")
                        },
                        {
                            type: "email",
                            prompt: mf("error.emailRequired")
                        }
                    ]
                },
            }
        });
    };
    return ForgotPassword;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPassword;

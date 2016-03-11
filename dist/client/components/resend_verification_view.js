"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var ResendVerification = (function (_super) {
    __extends(ResendVerification, _super);
    function ResendVerification() {
        _super.apply(this, arguments);
    }
    ResendVerification.prototype.emailVerification = function () {
        $("#sendVerification").addClass("loading");
        var email = this.refs["email"]["value"];
        this.props.emailVerification(email, function () {
            $("#sendVerification").removeClass("loading");
        });
    };
    ResendVerification.prototype.render = function () {
        var mf = this.props.context.i18n.initTranslator("accounts");
        return (React.createElement("div", {id: "resendVerificationForm", className: "ui black login form"}, 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("email")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "text", placeholder: mf("emailAddress"), ref: "email"}), 
                    React.createElement("i", {className: "mail icon"}))), 
            React.createElement("div", {className: "ui equal width center aligned grid"}, 
                React.createElement("div", {className: "first column"}, 
                    React.createElement("div", {className: "primary submit icon labeled ui button", id: "sendVerification", onClick: this.emailVerification.bind(this)}, 
                        React.createElement("i", {className: "icon mail"}), 
                        mf("resendVerification"))
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "Or"), 
                React.createElement("div", {className: "last column"}, 
                    React.createElement("div", {className: "green ui labeled icon button", id: "signInButton", onClick: this.props.showSignIn}, 
                        React.createElement("i", {className: "sign in icon"}), 
                        mf("signIn"))
                ))));
    };
    ResendVerification.prototype.componentDidMount = function () {
        this.props.clearMessages();
        var mf = this.props.context.i18n.initTranslator("accounts");
        $(".ui.form")
            .form({
            inline: true,
            on: "blur",
            fields: {
                username: {
                    identifier: "email",
                    rules: [
                        {
                            type: "empty",
                            prompt: mf("error.emailEmpty")
                        },
                        {
                            type: "email",
                            prompt: mf("error.invalidEmail")
                        }
                    ]
                }
            }
        });
    };
    return ResendVerification;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResendVerification;

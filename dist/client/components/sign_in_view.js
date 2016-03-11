"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var SignIn = (function (_super) {
    __extends(SignIn, _super);
    function SignIn() {
        _super.apply(this, arguments);
    }
    SignIn.prototype.signIn = function () {
        $("#signInForm").dimmer("show");
        var email = this.refs["email"]["value"];
        var password = this.refs["password"]["value"];
        this.props.signIn(email, password, function () {
            $("#signInForm").dimmer("hide");
        });
    };
    SignIn.prototype.render = function () {
        var mf = this.props.context.i18n.initTranslator("accounts");
        return (React.createElement("div", {className: "ui form login", id: "signInForm"}, 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("email")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "text", placeholder: mf("emailAddress"), id: "email", ref: "email"}), 
                    React.createElement("i", {className: "mail icon"}))), 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("password")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "password", placeholder: mf("password"), id: "password", ref: "password"}), 
                    React.createElement("i", {className: "lock icon"}))), 
            React.createElement("div", {className: "ui equal width center aligned grid", style: { marginTop: 5 }}, 
                React.createElement("div", {className: "left aligned column", style: { paddingTop: 2 }}, 
                    React.createElement("div", null, 
                        React.createElement("a", {href: "#", id: "forgotPasswordButton", onClick: this.props.showForgotPassword}, mf("forgotPassword"))
                    )
                ), 
                React.createElement("div", {className: "centered aligned"}, 
                    React.createElement("div", {className: "ui submit primary button", onClick: this.signIn.bind(this)}, mf("signIn"))
                ), 
                React.createElement("div", {className: "right aligned column", style: { paddingTop: 2 }}, 
                    React.createElement("div", null, 
                        React.createElement("a", {href: "#", onClick: this.props.showResendVerification}, mf("resendVerification"))
                    )
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "Or"), 
                React.createElement("div", {className: "column", style: { paddingTop: 2 }}, 
                    React.createElement("div", {className: "green ui labeled icon button", onClick: this.props.showRegister}, 
                        React.createElement("i", {className: "signup icon"}), 
                        mf("signUp"))
                ))));
    };
    SignIn.prototype.componentDidMount = function () {
        // this.props.clearMessages();
        var mf = this.props.context.i18n.initTranslator("accounts");
        $(".ui.form")
            .form({
            inline: true,
            on: "blur",
            fields: {
                username: {
                    identifier: "email",
                    rules: [{
                            type: "empty",
                            prompt: mf("error.emailRequired")
                        }, {
                            type: "email",
                            prompt: mf("error.emailRequired")
                        }]
                },
                password: {
                    identifier: "password",
                    rules: [{
                            type: "empty",
                            prompt: mf("error.passwordRequired")
                        }, {
                            type: "length[7]",
                            prompt: mf("error.minChar")
                        }]
                }
            }
        });
    };
    return SignIn;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignIn;

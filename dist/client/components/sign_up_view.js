"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var SignUp = (function (_super) {
    __extends(SignUp, _super);
    function SignUp() {
        _super.apply(this, arguments);
    }
    SignUp.prototype.register = function () {
        $("#signUpForm").form("validate form");
        if (!$("#signUpForm").form("is valid")) {
            return;
        }
        var name = this.refs["email"]["value"];
        var email = this.refs["email"]["value"];
        var pass1 = this.refs["password"]["value"];
        var pass2 = this.refs["password-again"]["value"];
        $("#registerButton").addClass("loading");
        this.props.register(name, email, pass1, pass2, function () {
            $("#registerButton").removeClass("loading");
        });
    };
    SignUp.prototype.render = function () {
        var mf = this.props.context.i18n.initTranslator("accounts");
        return (React.createElement("div", {className: "ui form login black", id: "signUpForm"}, 
            React.createElement("div", {className: "ui error message"}), 
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("fullName")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "text", placeholder: mf("nameAndSurename"), id: "name", ref: "name"}), 
                    React.createElement("i", {className: "user icon"}))), 
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
            React.createElement("div", {className: "field"}, 
                React.createElement("label", null, mf("passwordAgain")), 
                React.createElement("div", {className: "ui icon input"}, 
                    React.createElement("input", {type: "password", placeholder: mf("passwordAgain"), id: "password-again", ref: "password-again"}), 
                    React.createElement("i", {className: "lock icon"}))), 
            React.createElement("div", {className: "ui equal width center aligned grid"}, 
                React.createElement("div", {className: "first column"}, 
                    React.createElement("div", {className: "ui primary button", id: "registerButton", onClick: this.register.bind(this)}, mf("signUp"))
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "Or"), 
                React.createElement("div", {className: "last column"}, 
                    React.createElement("div", {className: "green ui labeled icon button", id: "signInButton", onClick: this.props.showSignIn}, 
                        React.createElement("i", {className: "sign in icon"}), 
                        mf("signIn"))
                ))));
    };
    SignUp.prototype.componentDidMount = function () {
        this.props.clearMessages();
        var mf = this.props.context.i18n.initTranslator("accounts");
        var rules = {
            name: {
                identifier: "name",
                rules: [{
                        type: "regExp[\\w \\w]",
                        prompt: mf("error.nameIncorrect")
                    }]
            },
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
                        prompt: mf("error.minChar7")
                    }]
            },
            passwordConfirm: {
                identifier: "password-again",
                rules: [{
                        type: "match[password]",
                        prompt: mf("error.pwdsDontMatch")
                    }]
            }
        };
        $("#signUpForm")
            .form({
            inline: true,
            fields: rules
        });
    };
    return SignUp;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignUp;

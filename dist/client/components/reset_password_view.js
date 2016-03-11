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
        var pass1 = this.refs["password"]["value"];
        var pass2 = this.refs["password-again"]["value"];
        this.props.resetPassword(pass1, pass2);
    };
    ResetPassword.prototype.render = function () {
        this.context = this.props.context;
        var mf = this.props.context.__;
        return (React.createElement("div", null, 
            React.createElement("form", {className: "ui form", id: "resetPasswordForm"}, 
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", null, mf("password")), 
                    React.createElement("div", {className: "ui icon input"}, 
                        React.createElement("input", {type: "password", placeholder: mf("password"), ref: "password"}), 
                        React.createElement("i", {className: "lock icon"}), 
                        React.createElement("div", {className: "ui corner label"}, 
                            React.createElement("i", {className: "icon asterisk"})
                        ))), 
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", null, mf("passwordAgain")), 
                    React.createElement("div", {className: "ui icon input"}, 
                        React.createElement("input", {type: "password", placeholder: mf("passwordAgain"), ref: "password-again"}), 
                        React.createElement("i", {className: "lock icon"}), 
                        React.createElement("div", {className: "ui corner label"}, 
                            React.createElement("i", {className: "icon asterisk"})
                        ))), 
                React.createElement("div", {className: "center aligned column"}, 
                    React.createElement("div", {className: "ui red fluid submit button", onClick: this.resetPassword.bind(this)}, mf("resetYourPassword"))
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "Or"), 
                React.createElement("div", {className: "center aligned column"}, 
                    React.createElement("div", {className: "green ui labeled icon button", onClick: this.props.showSignIn}, 
                        React.createElement("i", {className: "sign in icon"}), 
                        mf("signIn"))
                ))
        ));
    };
    ResetPassword.prototype.componentDidMount = function () {
        var mf = this.context.__;
        this.props.clearMessages();
        $(".ui.form")
            .form({
            inline: true,
            on: "blur",
            fields: {
                password: {
                    identifier: "password",
                    rules: [
                        {
                            type: "empty",
                            prompt: mf("passwordRequired")
                        },
                        {
                            type: "length[7]",
                            prompt: mf("minChar")
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

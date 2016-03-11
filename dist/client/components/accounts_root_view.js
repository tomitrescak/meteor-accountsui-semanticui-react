"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var sign_in_view_1 = require("./sign_in_view");
var forgot_password_view_1 = require("./forgot_password_view");
var resend_verification_view_1 = require("./resend_verification_view");
var reset_password_view_1 = require("./reset_password_view");
var sign_up_view_1 = require("./sign_up_view");
var AccountsRoot = (function (_super) {
    __extends(AccountsRoot, _super);
    function AccountsRoot() {
        _super.apply(this, arguments);
    }
    AccountsRoot.prototype.render = function () {
        this.context = this.props.context;
        // const { error } = this.props;
        return (React.createElement("div", null, 
            this.props.alerts ? React.createElement("div", {className: "ui red message"}, this.props.alerts) : "", 
            this.props.infos ? React.createElement("div", {className: "ui green message"}, this.props.infos) : "", 
            this.props.viewType === "forgotPassword" ? React.createElement(forgot_password_view_1.default, React.__spread({}, this.props)) : "", 
            this.props.viewType === "resendVerification" ? React.createElement(resend_verification_view_1.default, React.__spread({}, this.props)) : "", 
            this.props.viewType === "resetPassword" ? React.createElement(reset_password_view_1.default, React.__spread({}, this.props)) : "", 
            this.props.viewType === "signIn" ? React.createElement(sign_in_view_1.default, React.__spread({}, this.props)) : "", 
            this.props.viewType === "register" ? React.createElement(sign_up_view_1.default, React.__spread({}, this.props)) : ""));
    };
    return AccountsRoot;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountsRoot;

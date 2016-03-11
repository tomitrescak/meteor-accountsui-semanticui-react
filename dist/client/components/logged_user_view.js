"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var UserView = (function (_super) {
    __extends(UserView, _super);
    function UserView() {
        _super.apply(this, arguments);
    }
    UserView.prototype.render = function () {
        var mf = this.props.context.i18n.initTranslator("accounts");
        return (React.createElement("div", {className: "ui dropdown item", id: "userMenu"}, 
            React.createElement("i", {className: "user icon"}), 
            this.props.userName, 
            React.createElement("i", {className: "caret down icon"}), 
            React.createElement("div", {className: "menu"}, 
                React.createElement("a", {className: "item", id: "signOut", onClick: this.props.signOut}, 
                    React.createElement("i", {className: "sign out icon"}), 
                    mf("signOut"))
            )));
    };
    UserView.prototype.componentDidMount = function () {
        $("#userMenu").dropdown({ on: "hover" });
    };
    return UserView;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserView;

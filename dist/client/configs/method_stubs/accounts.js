"use strict";
function default_1(_a) {
    var Meteor = _a.Meteor;
    Meteor.methods({
        sendVerification: function (email) {
            check(email, String);
        },
        addUser: function (data) {
            // do nothing
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;

"use strict";
var accounts_base_1 = require("meteor/accounts-base");
var meteor_1 = require("meteor/meteor");
var check_1 = require("meteor/check");
function default_1() {
    meteor_1.Meteor.methods({
        sendVerification: function (email) {
            check(email, String);
            var user = meteor_1.Meteor.users.findOne({
                "emails.address": email
            });
            if (!user) {
                throw new meteor_1.Meteor.Error(403, "User not found");
            }
            if (user.emails[0].verified) {
                throw new meteor_1.Meteor.Error(403, "User already verified");
            }
            console.log("Sending verification email to: " + user.emails[0].address);
            return accounts_base_1.Accounts.sendVerificationEmail(user._id);
        },
        addUser: function (data) {
            check(data, {
                email: String,
                password: String,
                profile: check_1.Match.Any
            });
            // TODO: Roles
            var userId = accounts_base_1.Accounts.createUser({
                email: data.email,
                password: data.password,
                profile: data.profile
            });
            if (!userId) {
                throw new Error("createUser failed to insert new user");
            }
            // If `Accounts._options.sendVerificationEmail` is set, register
            // a token to verify the user"s primary email, and send it to
            // that address.
            accounts_base_1.Accounts.sendVerificationEmail(userId);
        }
    });
    // configs
    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for
    // help with their account, be sure to set this to an email address that you can receive email at.
    var config = {
        siteName: "Boilerplate",
        from: "tomi.trescak@gmail.com",
        accounts: {
            subject: "Please verify your email",
            body: "Hello ${user},<br />\n      <br />\n  To verify your account email, simply click the link below.<br />\n  <br />\n  <a href=\"${url}\">${url}</a><br />\n  <br />\n  Truly yours,<br />\n  Site Admin"
        }
    };
    accounts_base_1.Accounts.emailTemplates.from = config.from;
    // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
    accounts_base_1.Accounts.emailTemplates.siteName = config.siteName;
    // A Function that takes a user object and returns a String for the subject line of the email.
    accounts_base_1.Accounts.emailTemplates.enrollAccount.subject =
        accounts_base_1.Accounts.emailTemplates.verifyEmail.subject = function (user) {
            return config.accounts.subject
                .replace("${user}", user.profile.name)
                .replace("${siteName}", accounts_base_1.Accounts.emailTemplates.siteName);
        };
    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    accounts_base_1.Accounts.emailTemplates.enrollAccount.html =
        accounts_base_1.Accounts.emailTemplates.verifyEmail.html = function (user, url) {
            return config.accounts.body
                .replace("${siteName}", accounts_base_1.Accounts.emailTemplates.siteName)
                .replace(/\$\{url\}/g, url)
                .replace(/\$\{user\}/g, user.profile.name);
        };
    accounts_base_1.Accounts.config({
        sendVerificationEmail: true,
        // restrictCreationByEmailDomain: function(email: string) {
        //   let domain = email.slice(email.lastIndexOf("@") + 1); // or regex
        //   let exists = Sites.findOne({ accounts: domain });
        //   return exists;
        // },
        forbidClientAccountCreation: true
    });
    accounts_base_1.Accounts.validateLoginAttempt(function (attempt) {
        if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) {
            return false; // the login is aborted
        }
        return true;
    });
    // Accounts.onCreateUser(function(options: any, user: Meteor.User) {
    //   // add all active groups from the active site
    //   let domain = user.emails[0].address.slice(user.emails[0].address.lastIndexOf("@") + 1); // or regex
    //   let site = Sites.findOne({ accounts: domain });
    //
    //   if (site) {
    //     // add profile
    //     user.profile = options.profile;
    //     user.profile.groups = site.activeGroups;
    //     user.profile.site = site._id;
    //   } else {
    //     console.warn("No site for user: " + user);
    //   }
    //   return user;
    // });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;

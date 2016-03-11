import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Match } from "meteor/check";

export default function() {
  Meteor.methods({
    sendVerification: function(email: string) {
      check(email, String);

      let user = Meteor.users.findOne({
        "emails.address": email
      });
      if (!user) {
        throw new Meteor.Error(403, "User not found");
      }
      if (user.emails[0].verified) {
        throw new Meteor.Error(403, "User already verified");
      }
      console.log("Sending verification email to: " + user.emails[0].address);
      return Accounts.sendVerificationEmail(user._id);
    },
    addUser: function(data: any) {
      check(data, {
        email: String,
        password: String,
        profile: Match.Any
      });

      // TODO: Roles
      let userId = Accounts.createUser({
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
      Accounts.sendVerificationEmail(userId);
    }
  });

  // configs

  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for
  // help with their account, be sure to set this to an email address that you can receive email at.

  const config = {
    siteName: "Boilerplate",
    from: "tomi.trescak@gmail.com",
    accounts: {
      subject: "Please verify your email",
      body: `Hello \${user},<br />
      <br />
  To verify your account email, simply click the link below.<br />
  <br />
  <a href="\${url}">\${url}</a><br />
  <br />
  Truly yours,<br />
  Site Admin`
    }
  };

  Accounts.emailTemplates.from = config.from;

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = config.siteName;

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.enrollAccount.subject =
    Accounts.emailTemplates.verifyEmail.subject = function(user: Meteor.User): string {
      return config.accounts.subject
        .replace("${user}", user.profile.name)
        .replace("${siteName}", Accounts.emailTemplates.siteName);
    };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.enrollAccount.html =
    Accounts.emailTemplates.verifyEmail.html = function(user: Meteor.User, url: string): string {
      return config.accounts.body
        .replace("${siteName}", Accounts.emailTemplates.siteName)
        .replace(/\$\{url\}/g, url)
        .replace(/\$\{user\}/g, user.profile.name);
    };

  Accounts.config({
    sendVerificationEmail: true,
    // restrictCreationByEmailDomain: function(email: string) {
    //   let domain = email.slice(email.lastIndexOf("@") + 1); // or regex
    //   let exists = Sites.findOne({ accounts: domain });
    //   return exists;
    // },
    forbidClientAccountCreation: true
  });

  Accounts.validateLoginAttempt(function(attempt: any) {
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

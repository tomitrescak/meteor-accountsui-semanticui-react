Meteor.startup(function() {
  //  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for
  //  // help with their account, be sure to set this to an email address that you can receive email at.
  //  Accounts.emailTemplates.from = 'Clara\'s World <no-reply@pf.scem.uws.edu.au>';
  //
  //  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  //  Accounts.emailTemplates.siteName = 'Clara\'s World';
  //
  //  // A Function that takes a user object and returns a String for the subject line of the email.
  //  Accounts.emailTemplates.verifyEmail.subject = function(user) {
  //    return T9n.get('confirmEmail');
  //  };
  //
  //  // A Function that takes a user object and a url, and returns the body text for the email.
  //  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  //  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  //    return T9n.get('clickOnEmail') + url + '\n\n Truly yours\nClara';
  //  };

  // (server-side) called whenever a login is attempted
  Accounts.validateLoginAttempt(function(attempt) {
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) {
      return false; // the login is aborted
    }
    return true;
  });

  // // (server-side)
  // Accounts.onCreateUser(function(options, user) {
  //   // add profile
  //   user.profile = options.profile;
  //
  //   // we wait for Meteor to create the user before sending an email
  //   Meteor.setTimeout(function() {
  //     console.log('Sending email to: ' + user.emails[0].address);
  //     Accounts.sendVerificationEmail(user._id);
  //   }, 2 * 1000);
  //
  //   return user;
  // });

  Meteor.methods({
    sendVerificationEmail: function(email) {
      check(email, String);

      var user = Meteor.users.findOne({
        'emails.address': email
      });
      if (!user) {
        throw new Meteor.Error(403, 'User not found');
      }
      if (user.emails[0].verified) {
        throw new Meteor.Error(403, 'User already verified');
      }
      console.log("Sending verification email to: " + user.emails[0].address);
      return Accounts.sendVerificationEmail(user._id);
    },
    addUser: function(data) {
      check(data, {
        email: String,
        password: String,
        profile: Match.Any
      });

      // TODO: Roles
      var userId = Accounts.createUser({
        email: data.email,
        password: data.password,
        profile: data.profile
      });

      if (!userId)
        throw new Error("createUser failed to insert new user");

      // If `Accounts._options.sendVerificationEmail` is set, register
      // a token to verify the user's primary email, and send it to
      // that address.
      if (Accounts._options.sendVerificationEmail) {
        Accounts.sendVerificationEmail(userId);
        //console.log("Sending email ... ");
      }
    }
  });
});

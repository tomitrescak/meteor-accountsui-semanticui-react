import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

import { VIEWKEY , ERRORKEY, TOKENKEY, MESSAGEKEY } from "../actions/accounts";
import { __ } from "i18n-client";
import { IContext } from "./context";

export default function(context: IContext) {
  const { Session } = context;

  // configure accounts
  console.log("Configuring accounts ...");

  delete Accounts["_accountsCallbacks"]["reset-password"];
  Accounts.onResetPasswordLink((token: string, done: Function) => {
    Session.set(VIEWKEY, "resetPassword");
    Session.set(TOKENKEY, token);
  });

  delete Accounts["_accountsCallbacks"]["verify-email"];
  Accounts.onEmailVerificationLink((token: string, done: Function) => {
    Accounts.verifyEmail(token, function(err: any) {
      if (err != null) {
        if (err.message = "Verify email link expired [403]") {
          Session.set(ERRORKEY, __("accounts.error.loginTokenExpired"));
        }
      } else {
        Session.set(MESSAGEKEY, __("accounts.messages.emailVerified"));
        done();
      }
    });
  });

}

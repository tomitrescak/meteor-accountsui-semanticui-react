import { Accounts } from "meteor/accounts-base";
import { IContext } from "../configs/context";

export const VIEWKEY = "ACCOUNTS_VIEWTYPE";
export const ERRORKEY = "ACCOUNTS_ERROR";
export const MESSAGEKEY = "ACCOUNTS_MESSAGE";
export const TOKENKEY = "ACCOUNT_TOKEN";

function trimInput(value: string) {
  return value.replace(/^\s*|\s*$/g, "");
};

function isNotEmpty(value: string) {
  if (value && value !== "") {
    return true;
  }
  showError("accounts.error.requiredFields");
  return false;
};

function isEmail(value: string) {
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  showError("accounts.error.invalidEmail");
  return false;
};

function isValidPassword(password: string) {
  if (password.length < 7) {
    showError("accounts.error.minChar7");
    return false;
  }
  return true;
};

function areValidPasswords(password: string, confirm: string) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    showError("accounts.error.differentPasswords");
    return false;
  }
  return true;
};

let localState: any;

function showError(message: string) {
  debugger;
  localState.set(ERRORKEY, message);
}

function showInfo(message: string) {
  debugger;
  localState.set(MESSAGEKEY, message);
}

function clearMessages() {
  showError(null);
  showInfo(null);
}

const Actions = {
  clearMessages(ctx: IContext) {
    localState = ctx.Session;
    clearMessages();
  },

  signIn ({Meteor, __}: IContext, email: string, password: string, callback: Function, e: any) {
    clearMessages();

    email = trimInput(email.toLowerCase());

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
      // $("#signInForm").addClass("loading");

      Meteor.loginWithPassword(email, password, function(err: any) {
        callback();

        // $("#signInForm").removeClass("loading");
        if (err) {
          showError("accounts.error.invalidCredentials");
        } else {
          // Router.go("dashboard");
        }
      });
    }
    return false;
  },

  emailResetLink ({__}: IContext, email: string, callback: Function) {
    clearMessages();

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: email}, function(err: any) {
        callback();

        if (err) {
          if (err.message === "User not found [403]") {
            showError("accounts.error.emailNotFound");
          } else {
            showError("accounts.error.unknownError");
          }
        } else {
          showInfo("accounts.messages.passwordResetEmailSent");
        }
      });
    }
    return false;
  },

  resetPassword ({__, Session}: IContext, password: string, passwordConfirm: string): void {
    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      const token = Session.get(TOKENKEY);

      Accounts.resetPassword(token, password, function(err: any) {
        if (err) {
          if (err.message === "Token expired [403]") {
            showError("accounts.error.tokenExpired");
          } else {
            showError(err.message);
          }
        } else {
          showInfo("accounts.messages.passwordChanged");
          Session.set(TOKENKEY, null);
          Session.set(VIEWKEY, "signIn");
        }
      });
    }
  },

  register({__, Meteor, Session}: IContext, name: string, email: string, password: string, passwordConfirm: string, callback: any) {
    clearMessages();

    let data = {
      email: email,
      password: password,
      profile: {
        name: name
      }
    };

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

      Meteor.call("addUser", data, function(err: any, id: string) {

        callback();

        if (err) {
          if (err.message === "Email already exists. [403]") {
            showError("accounts.error.emailAlreadyExists");
          } else if (err.message === "Email doesn\"t match the criteria. [403]") {
            showError("accounts.error.emailLimited");
          } else if (err.message === "Login forbidden [403]") {
            showInfo("accounts.error.loginForbidden");
            Session.set(VIEWKEY, null);
          } else {
            showError("accounts.error.unknownError");
          }
        } else {
          showInfo("accounts.messages.verificationSent");
        }
      });
    }
    return false;
  },

  resendVerification({__, Meteor}: IContext, email: string, callback: Function) {
    clearMessages();

    if (isNotEmpty(email) && isEmail(email)) {
      Meteor.call("sendVerification", email, function(err: any) {
        callback();

        if (err) {
          if (err.message === "User not found [403]") {
            showError("accounts.error.emailNotFound");
          } if (err.message === "User already verified [403]") {
            showError("accounts.error.userAlreadyVerified");
          } else {
            showError("accounts.error.unknownError");
          }
        } else {
          showInfo("accounts.messages.verificationEmailSent");
        }
      });
    }
  },

  signOut({Meteor}: IContext) {
    Meteor.logout(function() {
      // Session.set("alert", "Bye Meteorite! Come back whenever you want!");
    });
  },

  showSignIn({Session}: IContext)  {
    Session.set(VIEWKEY, "signIn");
  },

  showResendVerification({Session}: IContext)  {
    Session.set(VIEWKEY, "resendVerification");
  },

  showRegister ({Session}: IContext) {
    Session.set(VIEWKEY, "register");
  },

  showForgotPassword ({Session}: IContext) {
    Session.set(VIEWKEY, "forgotPassword");
  }
};
export default Actions;

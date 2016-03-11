import { IContext } from "./context";

export default function({ i18n }: IContext) {
  i18n.add("en", {
    accounts: {
      confirmEmail: "Confirm Your Email Address",
      email: "Email",
      emailAddress: "Email address",
      emailResetLink: "Email reset link",
      error: {
        pwdsDontMatch: "Passwords don't match",
        emailAlreadyExists: "Account allready exists!",
        emailLimited: "Email is limited to specific domains",
        emailNotFound: "User with this email does not exist!",
        nameIncorrect: "Specified name is incorrect",
        emailIncorrect: "Specified email is incorrect",
        emailRequired: "Email is required",
        minChar7: "Password has to have at least 7 characters",
        userAlreadyVerified: "User was already verified",
        passwordRequired: "Password is required",
        loginTokenExpired: "Sorry this verification link has expired.",
        invalidCredentials: "We are sorry but these credentials are not valid.",
        unknownError: "We are experiencing problems with our server, please try again later.",
        tokenExpired: "This token is no longer valid",
        requiredFields: "Required fields are missing"
      },
      forgotPassword: "Forgot password?",
      fullName: "Full Name",
      messages: {
        clickOnEmail: "Dear Player\n\nPlease, click on the following link to verify your email address: ",
        passwordResetEmailSent: "Email sent, please check your inbox.",
        emailVerified: "Your email has been successfully verified. You will be automatically logged in ...",
        passwordChanged: "Your password was changed successfully",
        verificationEmailSent: "Verification email sent",
        verificationSent: "Congrats! You\"re now a new Player! Before logging in, your email has to be " +
          "verified. Soon, you will receive a verification email.",
      },
      nameAndSurename: "Name and Surename",
      password: "Password",
      passwordAgain: "Password Again",
      resendVerification: "Re-send verification",
      resetYourPassword: "Reset your password",
      signIn: "Sign In",
      signUp: "Register",
      signOut: "Sign Out"
    }
  });
}

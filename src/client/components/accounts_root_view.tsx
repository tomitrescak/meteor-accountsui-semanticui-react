import { Component } from "react";
import SignIn from "./sign_in_view";
import ForgotPassword from "./forgot_password_view";
import ResendVerification from "./resend_verification_view";
import ResetPassword from "./reset_password_view";
import Register from "./sign_up_view";

import { IContext } from "../configs/context";

export interface IComponentProps {
  alerts: string;
  infos: string;
  viewType: string;
  context: IContext;
}

export interface IComponentActions {
  clearMessages: () => void;
  emailResetLink: (email: string) => void;
  showSignIn: () => void;
  signOut: () => void;
  emailVerification: (email: string) => void;
  resetPassword: (pass1: string, pass2: string) => void;
  showForgotPassword: () => void;
  showResendVerification: () => void;
  showRegister: () => void;
  signIn: (userName: string, password: string) => void;
  register: (name: string, email: string, pass1: string, pass2: string) => void;
  context: IContext;
}

export interface IComponent extends IComponentProps, IComponentActions {}

export default class AccountsRoot extends Component<IComponent, {}> {
  context: IContext;

  render() {
    this.context = this.props.context;

    // const { error } = this.props;
    return (
      <div>
        { this.props.alerts ? <div className="ui red message">{ this.props.alerts }</div> : "" }
        { this.props.infos ? <div className="ui green message">{ this.props.infos }</div> : "" }
        { this.props.viewType === "forgotPassword" ? <ForgotPassword {...this.props} /> : "" }
        { this.props.viewType === "resendVerification" ? <ResendVerification {...this.props} /> : "" }
        { this.props.viewType === "resetPassword" ? <ResetPassword  {...this.props} /> : "" }
        { this.props.viewType === "signIn" ? <SignIn {...this.props} /> : "" }
        { this.props.viewType === "register" ? <Register {...this.props} /> : "" }
      </div>
    );
  }
}


import { Component } from "react";
import { IContext } from "../configs/context";

interface IComponentProps {
  context: IContext;
}

interface IComponentActions {
  clearMessages: () => void;
  showForgotPassword: () => void;
  showResendVerification: () => void;
  showRegister: () => void;
  signIn: (userName: string, password: string, callback: Function) => void;
}

interface IComponent extends IComponentProps, IComponentActions { }

export default class SignIn extends Component<IComponent, {}> {
  signIn() {
    $("#signInForm").dimmer("show");

    const email = this.refs["email"]["value"];
    const password = this.refs["password"]["value"];

    this.props.signIn(email, password, () => {
      $("#signInForm").dimmer("hide");
    });
  }

  render() {
    const mf = this.props.context.i18n.initTranslator("accounts");

    return (
      <div className="ui form login black" id="signInForm">
        <div className="field">
          <label>{ mf("email") }</label>
          <div className="ui icon input">
            <input type="text" placeholder={ mf("emailAddress") } id="email" ref="email" />
            <i className="mail icon" />
          </div>
        </div>
        <div className="field">
          <label>{ mf("password") }</label>
          <div className="ui icon input">
            <input type="password" placeholder={ mf("password") } id="password" ref="password" />
            <i className="lock icon" />
          </div>
        </div>
        <div className="ui equal width center aligned grid" style={{ marginTop: 5 }}>
          <div className="left aligned column" style={{ paddingTop: 2 }}>
            <div><a href="#" id="forgotPasswordButton" onClick={ this.props.showForgotPassword}>{ mf("forgotPassword") }</a></div>
          </div>
          <div className="centered aligned">
            <div className="ui submit primary button" onClick={this.signIn.bind(this) }>{ mf("signIn") }</div>
          </div>
          <div className="right aligned column" style={{ paddingTop: 2 }}>
            <div><a href="#" onClick={ this.props.showResendVerification}>{ mf("resendVerification") }</a></div>
          </div>
          <div className="ui horizontal divider">
            Or
          </div>
          <div className="column" style={{ paddingTop: 2 }}>
            <div className="green ui labeled icon button" onClick={this.props.showRegister}>
              <i className="signup icon" />
              { mf("signUp") }
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // this.props.clearMessages();
    const mf = this.props.context.i18n.initTranslator("accounts");

    $(".ui.form")
      .form({
        inline: true,
        on: "blur",
        fields: {
          username: {
            identifier: "email",
            rules: [{
              type: "empty",
              prompt: mf("error.emailRequired")
            }, {
                type: "email",
                prompt: mf("error.emailRequired")
              }]
          },
          password: {
            identifier: "password",
            rules: [{
              type: "empty",
              prompt: mf("error.passwordRequired")
            }, {
                type: "length[7]",
                prompt: mf("error.minChar")
              }]
          }
        }
      });
  }
}


import { Component } from "react";
import { IContext } from "../configs/context";

interface IComponentProps {
  context: IContext;
}

interface IComponentActions {
  clearMessages: () => void;
  resetPassword: (pass1: string, pass2: string) => void;
  showSignIn: () => void;
}

interface IComponent extends IComponentProps, IComponentActions { }

export default class ResetPassword extends Component<IComponent, {}> {
  context: IContext;

  resetPassword() {
    const pass1 = this.refs["password"]["value"];
    const pass2 = this.refs["password-again"]["value"];
    this.props.resetPassword(pass1, pass2);
  }

  render() {
    this.context = this.props.context;
    const mf = this.props.context.i18n.initTranslator("accounts");

    return (
      <div className="ui form login" id="resetPasswordForm">
        <div className="field">
          <label>{ mf("password") }</label>
          <div className="ui icon input">
            <input type="password" placeholder={ mf("password") } ref="password" />
            <i className="lock icon" />
            <div className="ui corner label">
              <i className="icon asterisk" />
            </div>
          </div>
        </div>
        <div className="field">
          <label>{ mf("passwordAgain") }</label>
          <div className="ui icon input">
            <input type="password" placeholder={ mf("passwordAgain") } ref="password-again" />
            <i className="lock icon" />
            <div className="ui corner label">
              <i className="icon asterisk" />
            </div>
          </div>
        </div>
        <div className="ui equal width center aligned grid">
          <div className="first column">
            <div className="ui red fluid submit button" onClick={this.resetPassword.bind(this) }>{ mf("resetYourPassword") }</div>
          </div>
          <div className="ui horizontal divider">
            Or
          </div>
          <div className="center aligned column">
            <div className="green ui labeled icon button" onClick={this.props.showSignIn}>
              <i className="sign in icon" />
              { mf("signIn") }
            </div>
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    const mf = this.context.i18n.initTranslator("accounts");
    this.props.clearMessages();

    $(".ui.form")
      .form({
        inline: true,
        on: "blur",
        fields: {
          password: {
            identifier: "password",
            rules: [
              {
                type: "empty",
                prompt: mf("error.passwordRequired")
              },
              {
                type: "length[7]",
                prompt: mf("error.minChar")
              }
            ]
          },
          passwordConfirm: {
            identifier: "password-again",
            rules: [
              {
                type: "match[password]",
                prompt: mf("error.pwdsDontMatch")
              }
            ]
          }
        }
      });
  }
}

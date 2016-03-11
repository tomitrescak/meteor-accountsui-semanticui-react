
import { Component } from "react";

import { IContext } from "../configs/context";

interface IComponentProps {
  context: IContext;
}

interface IComponentActions {
  clearMessages: () => void;
  emailResetLink: (email: string, callback: Function) => void;
  showSignIn: () => void;
}

interface IComponent extends IComponentProps, IComponentActions { }

export default class ForgotPassword extends Component<IComponent, {}> {
  emailResetLink() {
    $("#forgotPasswordForm").form("validate form");
    if (!$("#forgotPasswordForm").form("is valid")) {
      return;
    }

    $("#emailButton").addClass("loading");
    const email = this.refs["email"]["value"];
    this.props.emailResetLink(email, () => {
      $("#emailButton").removeClass("loading");
    });
  }

  render() {
    const mf = this.props.context.i18n.initTranslator("accounts");

    return (
      <div id="forgotPasswordForm" className="ui login form">
        <div className="field">
          <label>{ mf("email") }</label>
          <div className="ui icon input">
            <input type="text" placeholder={ mf("emailAddress") } id="email" ref="email" />
            <i className="mail icon" />
          </div>
        </div>
        <div className="ui equal width center aligned grid">
          <div className="first column">
            <div className="primary submit icon labeled ui button" id="emailButton" onClick={this.emailResetLink.bind(this) }>
              <i className="icon mail" />
              { mf("emailResetLink") }
            </div>
          </div>
          <div className="ui horizontal divider">
            Or
          </div>
          <div className="last column">
            <div className="green ui labeled icon button" id="signInButton" onClick={this.props.showSignIn.bind(this) }>
              <i className="sign in icon" />
              { mf("signIn") }
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.clearMessages();
    const mf = this.props.context.i18n.initTranslator("accounts");

    $(".ui.form")
      .form({
        inline: true,
        fields: {
          username: {
            identifier: "email",
            rules: [
              {
                type: "empty",
                prompt: mf("error.emailRequired")
              },
              {
                type: "email",
                prompt: mf("error.emailRequired")
              }
            ]
          },
        }
      });
  }
}

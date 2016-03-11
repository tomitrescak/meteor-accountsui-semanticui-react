import { Component } from "react";
import { IContext } from "../configs/context";

interface IComponentProps {
  context: IContext;
}

interface IComponentActions {
  clearMessages: () => void;
  emailVerification: (email: string, callback: Function) => void;
  showSignIn: () => void;
}

interface IComponent extends IComponentProps, IComponentActions { }

export default class ResendVerification extends Component<IComponent, {}> {
  emailVerification() {
    $("#sendVerification").addClass("loading");
    const email = this.refs["email"]["value"];
    this.props.emailVerification(email, () => {
      $("#sendVerification").removeClass("loading");
    });
  }

  render() {
    const mf = this.props.context.i18n.initTranslator("accounts");

    return (
      <div id="resendVerificationForm" className="ui login form">
        <div className="field">
          <label>{ mf("email") }</label>
          <div className="ui icon input">
            <input type="text" placeholder={ mf("emailAddress") } ref="email" />
            <i className="mail icon" />
          </div>
        </div>
        <div className="ui equal width center aligned grid">
          <div className="first column">
            <div className="primary submit icon labeled ui button" id="sendVerification" onClick={this.emailVerification.bind(this) }>
              <i className="icon mail" />
              { mf("resendVerification") }
            </div>
          </div>
          <div className="ui horizontal divider">
            Or
          </div>
          <div className="last column">
            <div className="green ui labeled icon button" id="signInButton" onClick={this.props.showSignIn}>
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
        on: "blur",
        fields: {
          username: {
            identifier: "email",
            rules: [
              {
                type: "empty",
                prompt: mf("error.emailEmpty")
              },
              {
                type: "email",
                prompt: mf("error.invalidEmail")
              }
            ]
          }
        }
      });
  }
}

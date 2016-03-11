import { Component } from "react";
import { IContext } from "../configs/context";

interface IComponentProps {
  context: IContext;
}

interface IComponentActions {
  clearMessages: () => void;
  register: (name: string, email: string, pass1: string, pass2: string, callback: Function) => void;
  showSignIn: () => void;
}

interface IComponent extends IComponentProps, IComponentActions { }

export default class SignUp extends Component<IComponent, {}> {
  register() {
    if ($("#registerButton").hasClass("loading")) {
      return;
    }
    $("#signUpForm").form("validate form");
    if (!$("#signUpForm").form("is valid")) {
      return;
    }

    const name = this.refs["email"]["value"];
    const email = this.refs["email"]["value"];
    const pass1 = this.refs["password"]["value"];
    const pass2 = this.refs["password-again"]["value"];

    $("#registerButton").addClass("loading");
    this.props.register(name, email, pass1, pass2, () => {
      $("#registerButton").removeClass("loading");
    });
  }

  render() {
    const mf = this.props.context.i18n.initTranslator("accounts");

    return (
      <div className="ui form login" id="signUpForm">
        <div className="ui error message" />
        <div className="field">
          <label>{ mf("fullName") }</label>
          <div className="ui icon input">
            <input type="text" placeholder={ mf("nameAndSurename") } id="name" ref="name" />
            <i className="user icon" />
          </div>
        </div>
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
        <div className="field">
          <label>{ mf("passwordAgain") }</label>
          <div className="ui icon input">
            <input type="password" placeholder={ mf("passwordAgain") } id="password-again" ref="password-again" />
            <i className="lock icon" />
          </div>
        </div>

        <div className="ui equal width center aligned grid">
          <div className="first column">
            <div className="ui primary button" id="registerButton" onClick={this.register.bind(this) }>{ mf("signUp") }</div>
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

    let rules = {
      name: {
        identifier: "name",
        rules: [{
          type: "regExp[\\w \\w]",
          prompt: mf("error.nameIncorrect")
        }]
      },
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
            prompt: mf("error.minChar7")
          }]
      },
      passwordConfirm: {
        identifier: "password-again",
        rules: [{
          type: "match[password]",
          prompt: mf("error.pwdsDontMatch")
        }]
      }
    };

    $("#signUpForm")
      .form({
        inline: true,
        fields: rules
      });
  }
}


import { Component } from "react";
import { IContext } from "../configs/context";

interface IComponentProps {
  context: IContext;
  showUserName: boolean;
}

interface IComponentActions {
  signOut: () => void;
}

interface IComponent extends IComponentProps, IComponentActions { }

export default class UserView extends Component<IComponent, {}> {
  render() {
    const mf = this.props.context.i18n.initTranslator("accounts");

    return (
      <div className="ui dropdown item" id="userMenu">
          <i className="user icon" />
          { this.props.showUserName ? this.props.context.Meteor.user().profile.name : "" }
          <i className="caret down icon" />
          <div className="menu">
              <a className="item" id="signOut" onClick={this.props.signOut}><i className="sign out icon" />{ mf("signOut") }</a>
          </div>
      </div>

    );
  }
}

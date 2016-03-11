import { IContext } from "../configs/context";
import { useDeps, composeWithTracker, composeAll, IKomposer, IKomposerData } from "mantra-core";
import Component, { IComponentProps, IComponentActions } from "../components/accounts_root_view";
import { VIEWKEY, ERRORKEY, MESSAGEKEY } from "../actions/accounts";

interface IProps {
  context?: IContext;
}

export const composer: IKomposer = ({context}: IProps, onData: IKomposerData<IComponentProps>) => {
  const { Session, i18n }: IContext = context;
  let viewType = Session.get(VIEWKEY);

  if (!viewType) {
    viewType = "signIn";
  }

  const __ = i18n.translate;

  onData(null, {
    viewType: viewType,
    alerts: Session.get(ERRORKEY) ? __(Session.get(ERRORKEY)) : null,
    infos: Session.get(MESSAGEKEY) ? __(Session.get(MESSAGEKEY)) : null,
    context: context
  });

  return null;
};

export const depsMapper = (context: IContext, actions: any): IComponentActions => ({
  clearMessages: actions.accounts.clearMessages,
  emailResetLink: actions.accounts.emailResetLink,
  signIn: actions.accounts.signIn,
  signOut: actions.accounts.signOut,
  emailVerification: actions.accounts.resendVerification,
  resetPassword: actions.accounts.resetPassword,
  showForgotPassword: actions.accounts.showForgotPassword,
  showResendVerification: actions.accounts.showResendVerification,
  showRegister: actions.accounts.showRegister,
  showSignIn: actions.accounts.showSignIn,
  register: actions.accounts.register,
  context: context
});

export default composeAll<IProps>(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);

import actions from "./actions/index";
import methodStubs from "./configs/method_stubs/accounts";
import accountsConfig from "./configs/accounts_config";
import i18n from "./configs/i18n";

import "../stylesheets/main";

export default {
  actions,
  load(context: any) {
    methodStubs(context);
    accountsConfig(context);
    i18n(context);
  }
};

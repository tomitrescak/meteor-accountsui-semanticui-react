let mantraModule = require('./dist/client/index').default;
let accountContainer = require('./dist/client/containers/accounts_container').default;
let userView = require('./dist/client/containers/user_container').default;
let serverMethods = require('./dist/server/methods/index').default;

module.exports = {
  Module: mantraModule,
  AccountsView: accountContainer,
  UserView: userView,
  Methods: serverMethods
}

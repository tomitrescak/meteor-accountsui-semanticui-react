let mantraModule = require('./dist/client/index').default;
let mantraConatiner = require('./dist/client/containers/accounts_container').default;
let serverMethods = require('./dist/server/methods/index').default;

module.exports = {
  Module: mantraModule,
  AccountsView: mantraConatiner,
  Methods: serverMethods
}

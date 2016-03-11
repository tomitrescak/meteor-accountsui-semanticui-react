Meteor accounts package for Semantic UI.

# Installation

1. Install package via `npm install meteor-accountsui-semanticui-react`
2. Register the module in your `client/main.js` file via:

   ```javascript
   import { Module as accountsModule } from "meteor-accountsui-semanticui-react";
   ...
   app.loadModule(accountsModule);
   ```

3. Register the server methods in your `server/methods/index.js` file
   ```javascript
   import { Methods as accountsMethods } from "meteor-accountsui-semanticui-react";

   export default function () {
     ...
     accountsMethods();
   }
   ```
4. You can view the login control  via:
   ```javascript
   import { AccountsView, UserView } from "meteor-accountsui-semanticui-react";
   ...
   const HomeView = () => (
     <AccountsView />
     <UserView />
   )
   ```

 # Warning

 Work in progress !!!

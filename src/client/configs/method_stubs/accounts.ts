import { IContext } from "../context";

export default function({Meteor}: IContext) {
  Meteor.methods({
    sendVerification: function(email: string) {
      check(email, String);
    },
    addUser: function(data: any) {
      // do nothing
    }
  });
}

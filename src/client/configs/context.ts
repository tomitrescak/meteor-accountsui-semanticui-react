import {Meteor} from "meteor/meteor";
import {ReactiveDict} from "meteor/reactive-dict";
import {Tracker} from "meteor/tracker";
import { __, i18n } from "i18n-client";

export { useDeps, composeWithTracker, compose, composeAll } from "mantra-core";

export interface IContext {
  Meteor: typeof Meteor;
  Session: ReactiveDict;
  Tracker: typeof Tracker;
  i18n: typeof i18n;
  __: typeof __;
}

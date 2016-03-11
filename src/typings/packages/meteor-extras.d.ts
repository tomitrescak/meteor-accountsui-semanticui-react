declare module "meteor/reactive-dict" {
  export class ReactiveDict {
    get(key: string): any;
    set(key: string, value: any): void;
  }
}

declare module "meteor/meteor" {
  export module Meteor {
    export function uuid(): string;

    interface AsyncCallback { (error: Meteor.Error, result: any): void; }
  }
}

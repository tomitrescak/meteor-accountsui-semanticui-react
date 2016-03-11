declare module "meteor/kadira:flow-router" {
  export interface FlowRouterRouteParameters {
    name?: string;
    subscriptions?: Function;
    action?: Function;
    middlewares?: any[];
    triggersEnter?: any[];
    triggersExit?: any[];
  }

  export interface FlowRouterRoute {
    path: string;
    params: Object;
    queryParams: Object;
    route: { name: string };
  }

  export interface FlowRouterGroupParams {
    prefix?: string;
    action?: Function;
    middlewares?: any[];
    subscriptions?: Function;
    triggersEnter?: any[];
    triggersExit?: any[];
  }

  export interface FlowRouterGroup {
    route(routeUrl: string, routeParameters: FlowRouterRouteParameters): void;
  }

  export interface FlowRouterStatic {
    notFound: FlowRouterRouteParameters;

    route(routeUrl: string, routeParameters: FlowRouterRouteParameters): void;
    path(routeName: string, routeParams?: Object, queryParams?: Object): string;
    getParam(paramName: string): string;
    getQueryParam(paramName: string): string;
    go(routeName: string, routeParams?: Object, queryParams?: Object): string;
    setParams(newParams: Object): void;
    setQueryParams(newParams: Object): void;
    getRouteName(): string;
    current(): FlowRouterRoute;
    watchPathChange(): void;
    group(params: FlowRouterGroupParams): FlowRouterGroup;
    subsReady(subscription?: string): boolean;
    initialize(): any;
  }

  export var FlowRouter: FlowRouterStatic;
}

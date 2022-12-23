import AbstractView from '../views/AbstractView';

export interface IRoute {
    path?: string;
    view: new (route: IRoute) => AbstractView;
    template: string;
    isParent?: boolean;
    child?: IRoute;
    parameters?: Record<string, string>;
}
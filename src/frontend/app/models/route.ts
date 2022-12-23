export interface IRoute {
    path?: string;
    view: any;
    template: string;
    isParent?: boolean;
    child?: IRoute;
    parameters?: any;
}
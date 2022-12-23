import { IRoute } from './route';

export interface IView {
    templateName: string;
    html: string;
    childRoute: IRoute;
    childView: IView;
    isParent: boolean;
    parameters: Record<string, string>;
}
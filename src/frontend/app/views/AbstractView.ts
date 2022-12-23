import * as Environment from '../const/Environment.js';
import { IRoute } from '../models/route';
import { IView } from '../models/view';

export default abstract class implements IView {
    templateName: string;

    html: string;

    childRoute: IRoute;

    childView: IView;

    isParent: boolean;

    parameters: Record<string, string>;

    constructor(route: IRoute) {
        this.templateName = route.template;
        this.parameters = route.parameters;
        console.log('Loading constructor of ' + this.templateName + ' view');
        if (this.parameters) {
            console.log('View ' + this.templateName + ' received parameters: ', this.parameters);
        }
        this.loadResources(this.templateName);
        if (route.child) {
            this.isParent = true;
            this.childRoute = route.child;
            if (this.parameters) {
                route.child.parameters = this.parameters;
            }
            this.childView = new route.child.view(route.child);
        }
    }

    abstract init(): void

    private resources$(templateName: string): Promise<Response> {
        if (!templateName) templateName = this.templateName;
        return fetch(`${Environment.staticUrl}html/${templateName}.html`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response;
            });
    }

    private async loadResources(templateName: string): Promise<void> {
        console.log(`Start loading resourcses of ${templateName} view...`);
        const resources = await this.resources$(templateName);
        this.html = await resources.text();

        if (this.isParent) {
            this.html = this.html.replace('<div id="child"></div>', `<div id="${this.childRoute.template}"></div>`);
        }

        const element = document.querySelector('#' + templateName);
        if (element) {
            element.innerHTML = this.html;
        }
        console.log(`Finishesd loading resourcses of ${templateName} view.`);
        this.init?.();
    }
}
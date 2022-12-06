import * as Environment from "../../const/Environment.js";

export default class {
    templateName;

    html;

    childRoute;

    childView;

    isParent;

    isChild;

    constructor(route) {
        this.templateName = route.template;
        this.isChild = route.isChild;
        console.log("Loading constructor of " + this.templateName + " view");
        this.loadResources(this.templateName);
        if (route.child) {
            this.isParent = true;
            route.child.isChild = true;
            this.childRoute = route.child;
            this.childView = new route.child.view(route.child);
        }
    }

    resources$(templateName) {
        if (!templateName) templateName = this.templateName;
        return fetch(`${Environment.staticUrl}html/${templateName}.html`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response;
            });
    }

    async loadResources(templateName) {
        console.log(`Start loading resourcses of ${templateName} view...`);
        const resources = await this.resources$(templateName);
        this.html = await resources.text();

        if (this.isParent) {
            this.html = this.html.replace(`<div id="child"></div>`, `<div id="${this.childRoute.template}"></div>`);
        }

        const element = document.querySelector("#" + templateName);
        if (element) {
            element.innerHTML = this.html;
        }
        console.log(`Finishesd loading resourcses of ${templateName} view.`);
    }
}
import * as Environment from "../../const/Environment.js";

export default class {
    templateName;

    html;

    constructor(templateName) {
        console.log('Load constructor of ' + templateName);
        this.templateName = templateName;
        this.loadResources();
    }

    resources$(templateName) {
        if (!templateName) templateName = this.templateName;
        console.log(`Start loading resourcses of ${templateName} view...`);
        return fetch(`${Environment.staticUrl}html/${templateName}.html`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response;
            });
    }

    async loadResources() {
        const resources = await this.resources$(this.templateName);
        this.html = await resources.text();
        const element = document.querySelector("#" + this.templateName);
        if (element) {
            element.innerHTML = this.html;
        }
    }
}
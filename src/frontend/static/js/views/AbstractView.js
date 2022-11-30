import * as Environment from "../../const/Environment.js";

export default class {
    templateName;

    html;

    constructor(templateName) {
        this.templateName = templateName;
    }

    loadResources() {
        console.log(`Start loading resourcses of ${this.templateName} view...`);
        return fetch(`${Environment.staticUrl}html/${this.templateName}.html`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.text();
            })
            .then((text) => {
                this.html = text;
                return text;
            });
    }
}
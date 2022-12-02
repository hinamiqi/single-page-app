import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    childView;

    constructor(childView) {
        super('application');
        if (childView) {
            this.childView = new childView();
        }
    }
}
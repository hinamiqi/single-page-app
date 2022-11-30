import { RouteResolver } from "./RouteResolver.js";

export class Application {
    router;

    constructor() {
        this.router = new RouteResolver();
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        console.log("Navigated to url " + url);
        this.changeView();
    }

    pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

    async changeView() {
        const view = this.router.route(location.pathname);
        if (!view) return;
        const html = view.html || await view.loadResources();
        document.querySelector("#app").innerHTML = html;
    }
}
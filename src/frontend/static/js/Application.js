import { RouteResolver } from "./RouteResolver.js";

export class Application {
    router;

    currentView;

    constructor() {
        this.router = new RouteResolver();
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        console.log("Navigated to url " + location.pathname);
        this.changeView();
    }

    changeView() {
        const route = this.router.resolveRoute(location.pathname);
        this.currentView = new route.view(route);
    }
}
import DashboardView from "./views/DashboardView.js";

export class RouteResolver {
    currentRoute;

    routes;

    constructor() {
        this.routes = [
            { path: "/dashboard", view: DashboardView }
        ];
    }

    route(url) {
        this.currentRoute = url;
        return this.getCurrentView();
    }

    getCurrentView() {
        let match = this.routes.find(r => location.pathname === r.path);
        if (match) {
            const view = new match.view();
            return view;
        }

        return null;
    }
}
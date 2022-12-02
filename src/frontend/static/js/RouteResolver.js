import DashboardView from "./views/ApplicationView.js";
import PostsView from "./views/PostsView.js"
import SettingsView from "./views/SettingsView.js"

// TODO Maybe that class is redundant (move to Application?)
export class RouteResolver {
    currentRoute;

    routes;

    currentView;

    constructor() {
        // TODO Child view may have it's own childs?..
        this.routes = [
            { path: "/", view: DashboardView },
            { path: "/posts", view: DashboardView, child: PostsView },
            { path: "/settings", view: DashboardView, child: SettingsView },
        ];
    }

    route(url) {
        this.currentRoute = url;
        let match = this.routes.find(r => location.pathname === r.path);
        if (!match) return;

        this.currentView = new match.view(match.child);
        return this.currentView;
    }
}
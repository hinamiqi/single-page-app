import DashboardView from "./views/ApplicationView.js";
import PostsView from "./views/PostsView.js"
import ContactsView from "./views/ContactsView.js"
import AboutMeView from "./views/AboutMeView.js"

// TODO Maybe that class is redundant (move to Application?)
export class RouteResolver {
    currentRoute;

    routes;

    currentView;

    constructor() {
        // TODO Child view may have it's own children?..
        this.routes = [
            { path: "/", view: DashboardView, child: AboutMeView },
            { path: "/posts", view: DashboardView, child: PostsView },
            { path: "/contacts", view: DashboardView, child: ContactsView },
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
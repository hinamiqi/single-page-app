import ApplicationView from "./views/ApplicationView.js";
import PostsView from "./views/PostsView.js"
import ContactsView from "./views/ContactsView.js"
import AboutMeView from "./views/AboutMeView.js"

export class RouteResolver {
    currentRoute;

    routes;

    constructor() {
        this.routes = [
            {
                path: "/",
                view: ApplicationView,
                template: "application",
                isParent: true,
                child: {
                    view: AboutMeView,
                    template: "about_me",
                    child: {//TODO Allow multiple childs.
                        view: PostsView,
                        template: "posts"
                    }
                }
            },
            {
                path: "/posts",
                view: ApplicationView,
                template: "application",
                isParent: true,
                child: {
                    view: PostsView,
                    template: "posts"
                }
            },
            {
                path: "/contacts",
                view: ApplicationView,
                template: "application",
                isParent: true,
                child: {
                    view: ContactsView,
                    template: "contacts"
                }
            },
        ];
    }

    //TODO use RegExp to match URL's (with parameters)
    pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

    resolveRoute(url) {
        let match = this.routes.find(r => location.pathname === r.path);
        if (!match) return;

        this.currentRoute = url;
        return match;
    }
}
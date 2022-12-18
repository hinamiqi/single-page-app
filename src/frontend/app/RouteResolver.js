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
                path: "/posts/:id/:name",
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

    getParams(route) {
        const values = route.result.slice(1);
        if (!values.length) return;

        const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    };

    pathToRegex(path) {
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }

    resolveRoute(url) {
        let match = this.routes.find(r => {
            r.result = location.pathname.match(this.pathToRegex(r.path));
            return r.result;
        });

        if (!match) return;

        match.parameters = this.getParams(match);

        this.currentRoute = url;
        return match;
    }
}
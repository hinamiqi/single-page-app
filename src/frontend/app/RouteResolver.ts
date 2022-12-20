import ApplicationView from './views/ApplicationView.js';
import PostsView from './views/PostsView.js';
import ContactsView from './views/ContactsView.js';
import AboutMeView from './views/AboutMeView.js';

import { IRoute } from './models/route';

export class RouteResolver {
    currentUrl: string;

    routes: IRoute[];

    constructor() {
        this.routes = [
            {
                path: '/',
                view: ApplicationView,
                template: 'application',
                isParent: true,
                child: {
                    view: AboutMeView,
                    template: 'about_me',
                    child: {//TODO Allow multiple childs.
                        view: PostsView,
                        template: 'posts'
                    }
                }
            },
            {
                path: '/posts',
                view: ApplicationView,
                template: 'application',
                isParent: true,
                child: {
                    view: PostsView,
                    template: 'posts'
                }
            },
            {
                path: '/posts/:id/:name',
                view: ApplicationView,
                template: 'application',
                isParent: true,
                child: {
                    view: PostsView,
                    template: 'posts'
                }
            },
            {
                path: '/contacts',
                view: ApplicationView,
                template: 'application',
                isParent: true,
                child: {
                    view: ContactsView,
                    template: 'contacts'
                }
            },
        ];
    }

    getParams(route: IRoute): Record<string, string> {
        const values = route.result.slice(1);
        if (!values.length) return;

        const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    }

    pathToRegex(path: string): RegExp {
        return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
    }

    resolveRoute(url: string): IRoute {
        const match = this.routes.find(r => {
            //FIXME remove `result` from `IRoute`!
            r.result = location.pathname.match(this.pathToRegex(r.path));
            return r.result;
        });

        if (!match) return;

        match.parameters = this.getParams(match);

        this.currentUrl = url;
        return match;
    }
}
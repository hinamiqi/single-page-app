import { IView } from './models/view';
import { RouteResolver } from './RouteResolver';

export class Application {
    router: RouteResolver;

    currentView: IView;

    constructor() {
        this.router = new RouteResolver();
    }

    navigateTo(target: HTMLLinkElement): void {
        history.pushState(null, null, target.href);
        console.log('Navigated to url ' + location.pathname);
        this.changeView();
    }

    changeView(): void {
        const route = this.router.resolveRoute(location.pathname);
        if (!route) return;
        this.currentView = new route.view(route);
    }
}
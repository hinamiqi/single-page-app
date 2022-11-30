export class Application {
    currentRoute;

    constructor() {}

    navigateTo(url) {
        history.pushState(null, null, url);
        console.log("Navigated to url " + url);
        this.currentRoute = url;
        this.route();
    }

    pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

    route() {
        const routes = [
            { path: "/", view: "Hello!" },
            { path: "/posts", view: "Content..." },
            { path: "/settings", view: "Settings: ..." },
        ];

        console.log(location.pathname);
        console.log(this.pathToRegex("/settings"));
        let match = routes.find(r => location.pathname === r.path);

        if (match) {
            document.querySelector("#app").innerHTML = match.view;
        }
    }
}
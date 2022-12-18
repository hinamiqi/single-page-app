// import { Application } from "./Application.js";

console.log('JS is loaded!');

// const app = new Application();

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if ((<HTMLLinkElement>e.target).matches('[data-link]')) {
            e.preventDefault();
            // app.navigateTo(e.target);
        }
    });
});

// window.addEventListener("popstate", app.changeView());
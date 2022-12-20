import { Application } from './Application.js';

console.log('JS is loaded!');

const app = new Application();

app.navigateTo();

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if ((<HTMLLinkElement>e.target).matches('[data-link]')) {
            e.preventDefault();
            app.navigateTo((<HTMLLinkElement>e.target));
        }
    });
});

// window.addEventListener("popstate", app.changeView());
import { Application } from "./app.js";

console.log("JS is loaded!");

const app = new Application();

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[nav-link]")) {
            e.preventDefault();
            app.navigateTo(e.target);
        }
    })
});
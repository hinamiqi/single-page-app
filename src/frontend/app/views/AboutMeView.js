import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(route) {
        super(route);
    }

    init() {
        const w = document.querySelector("#about_me");
        w.addEventListener("scroll", () => {
            this.recalc();
        });
        this.recalc();
    }

    recalc() {
        document.querySelectorAll(".reveal > p").forEach(el => {
            let windowHeight = window.innerHeight;
            let elementTop = el.getBoundingClientRect().top;
            const o = (windowHeight - elementTop) / windowHeight;
            el.style.opacity = 1.2 - (1 - o) ** 3;
        });
    }
}
import { IRoute } from '../models/route';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor(route: IRoute) {
        super(route);
    }

    init(): void {
        const w = document.querySelector('#about_me');
        w.addEventListener('scroll', () => {
            this.recalc();
        });
        this.recalc();
    }

    recalc(): void {
        document.querySelectorAll('.reveal > p').forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const o = (windowHeight - elementTop) / windowHeight;
            (<HTMLElement>el).style.opacity = `${1.2 - (1 - o) ** 3}`;
        });
    }
}
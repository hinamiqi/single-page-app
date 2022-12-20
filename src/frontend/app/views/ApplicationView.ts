import { IRoute } from '../models/route';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor(route: IRoute) {
        super(route);
    }

    init(): void {
        console.log('ApplicationView initialized');
    }
}
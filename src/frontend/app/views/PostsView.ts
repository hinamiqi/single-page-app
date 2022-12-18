import { IRoute } from '../models/route';
import AbstractView from './AbstractView';

export default class extends AbstractView {
    constructor(route: IRoute) {
        super(route);
    }

    init(): void {
        console.log('PostsView initialized');
    }
}
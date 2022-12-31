import { render } from '../../lib/lit-html.js';
import { navTemplate } from '../views/navView.js';

export function renderMiddleware(mainElement, navElement) {
    //save state and get it by CLOSURE
    let hasUser = null;

    function renderMain(template) {
        render(template, mainElement);
    }

    function renderNav(user) {
        render(navTemplate(user), navElement)
    }

    return function (ctx, next) {
        //check if state is different from ctx.user , if it is - update and make them equal, first time will be different!!
        if (Boolean(ctx.user !== hasUser)) {
            hasUser = Boolean(ctx.user);
            renderNav(ctx.user);
        }
        ctx.render = renderMain
        next();
    }

}
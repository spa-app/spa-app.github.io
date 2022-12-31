import { getOne } from "../data/procedureService.js";

export function preloader(param, collection) {

    return async function (ctx, next) {
        const id = ctx.params[param];
        if (id) {
            const data = await getOne(id)
            ctx.data = data;
        }
        next();
    }
}
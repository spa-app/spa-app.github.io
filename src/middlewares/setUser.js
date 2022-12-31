export function setUserMiddleware(loadData) {

    return function (ctx, next) {
        const user = loadData();
        if (user) {
            ctx.user = user;
        }

        next();
    }
}
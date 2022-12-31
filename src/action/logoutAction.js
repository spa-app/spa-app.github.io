import { logout } from "../data/user.js";


export async function logoutAction(ctx, next) {
    logout();
    history.replaceState({}, '', '/login');
    ctx.page.redirect('/login');
}
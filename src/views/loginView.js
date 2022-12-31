import { html } from "../../lib/lit-html.js";
import { login } from "../data/user.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (form) => html`
<form @submit=${form.onSubmit} class="form form-auth">
    <h3>Login</h3>
    <label>Email: <input type="email" name="email" required /> </label>
    <label>Password: <input type="password" name="password" required /> </label>
    <input type="submit" value="Login" />
</form>
`
async function onSubmitHandler(ctx, { email, password }) {
    if (email == '' || password == '') {
        return alert('All fields are required!');
    }

    await login(email, password)
    ctx.page.redirect('/home')
}

export function showLoginView(ctx, next) {
    let form = {
        onSubmit: createSubmitHandler(onSubmitHandler.bind(null, ctx))
    }

    ctx.render(loginTemplate(form));
}
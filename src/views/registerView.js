import { html } from "../../lib/lit-html.js";
import { register } from "../data/user.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (form) => html`
<form @submit=${form.onSubmit} class="form form-auth">
    <h3>Register</h3>
    <label>Email: <input type="email" name="email" required /> </label>
    <label>Username: <input type="text" name="username" required /> </label>
    <label>Password: <input type="password" name="password" required /> </label>
    <label>Reapeat Password: <input type="password" name="repass" required /> </label>
    <input type="submit" value="Register" />
</form>
`
async function onSubmitHandler(ctx, { email, username, password, repass }) {
    if (email == '' || username == '' || password == '' || repass == '') {
        return alert('All fields are required!');
    }
    if (password != repass) {
        return alert('The passwords must be the same!');
    }

    await register(email, password, username)
    ctx.page.redirect('/home')
}

export function showRegisterView(ctx, next) {
    let form = {
        onSubmit: createSubmitHandler(onSubmitHandler.bind(null, ctx))
    }

    ctx.render(registerTemplate(form));
}
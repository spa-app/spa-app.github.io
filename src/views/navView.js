import { html } from "../../lib/lit-html.js";

export const navTemplate = (user) => html`
<nav>
    <a href="/home">Home</a>
    <a href="/catalog">Catalog</a>
    ${user
        ? html`
    <a href="/my-catalog">My Catalog</a>
    <a href="/create">Create</a>
    <a href="/logout">Logout</a>`
        : html`<a href="/login">Login</a>
    <a href="/register">Register</a>`
        }
    <a id="welcome" href="javascript:void(0)">Welcome ${user ? user.email : 'guest'}</a>
</nav>
`
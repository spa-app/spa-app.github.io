import { html } from "../../lib/lit-html.js";

const loaderTemplate = () => html`
<p class="loading">Loading...</p>
`

export function showLoaderView(ctx, next) {

    ctx.render(loaderTemplate());
    next();
}
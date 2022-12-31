import { html } from "../../lib/lit-html.js";

const homeTemplate = () => html`
<h3>HOME PAGE</h3>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates nemo nam accusantium, explicabo laudantium
    libero maxime veritatis sunt incidunt illum?</p>
`

export function showHomeView(ctx, next) {

    ctx.render(homeTemplate());
}
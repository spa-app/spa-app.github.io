import { html } from "../../lib/lit-html.js";
import { getAll } from "../data/procedureService.js";


const procedurePreviewCard = (procedure) => html`
<li>
    <h3>${procedure.title}</h3>
    <span>${procedure.type}</span>
    <p>${procedure.description.slice(0,30)}...  </p>
    <img src="${procedure.imageUrl}" alt="" />
    <button><a href="/details/${procedure.objectId}">Details</a></button>
</li>
`

const catalogTemplate = (data) => html`
<h3>Procedure's Catalog </h3>
<div class="center-wrapper">
    <ul>
        ${data.results.length > 0 
    ? data.results.map(procedurePreviewCard)
    : null}
    </ul>
</div>
`

export async function showCatalogView(ctx, next) {
    const data = await getAll();
    ctx.render(catalogTemplate(data));
}

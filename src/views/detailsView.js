import { html } from "../../lib/lit-html.js";
import { deleteOne } from "../data/procedureService.js";

const detailsTemplate = (data, isOwner, onDelete) => html`
<h2>Details PAGE - ${data.objectId}</h2>
<div class="center-wrapper">
    <section class="details-card">
        <h2>${data.title}</h2>
        <span>${data.type}</span>
        <img src="${data.imageUrl}" alt="" />
        <div class="desc">
            <h3>Description</h3>
            <p>${data.description}</p>
        </div>
        ${isOwner ? html`<div class="controls"><a href="/edit/${data.objectId}">Edit</a> <a @click=${onDelete}
                href="javascript:void(0)">Delete</a> </div>` :
        null}
    </section>
</div>
`
async function onDeleteHandler(ctx, event) {
    const confired = confirm('Are you sure you want to delete ' + ctx.data.title + ' ?');
    if (confired) {
        await deleteOne(ctx.params.id, ctx.user.objectId);
        ctx.page.redirect('/catalog');
    }
}

export function showDetailsView(ctx, next) {
    let isOwner = ctx.data?.owner?.objectId == ctx.user?.objectId
    ctx.render(detailsTemplate(ctx.data, isOwner, onDeleteHandler.bind(null, ctx)));
}
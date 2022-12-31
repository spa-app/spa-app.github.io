import { html } from "../../lib/lit-html.js";
import { updateOne } from "../data/procedureService.js";
import { createSubmitHandler } from "../util.js";

const bodyZoneOptionsTemplate = (zone) => html`
<option value="" disabled>Избери зона на тялото</option>
<option value="face" ?selected=${zone =='face'}>Лице</option>
<option value="legs" ?selected=${zone =='legs'}>Крака</option>
<option value="whole-body" ?selected=${zone =='whole-body'}>Цяло тяло</option>
`
const typeOptionsTemplate = (type) => html`
<option value="" selected disabled>Select an Option</option>
<option value="1" ?selected=${type =='1'}>Test 1</option>
<option value="2" ?selected=${type =='2'}>Test 2</option>
`


const editTemplate = (form) => html`
<form @submit=${form.onSubmit} class="form">
    <h3>Edit procedure</h3>
    <label>Procedure title: <input type="text" name="title" .value=${form.data.title} /> </label>
    <label>Description: <textarea name="description" id="" cols="30" rows="4"
            .value=${form.data.description}></textarea> </label>
    <label>Positives: <input type="text" name="positives" .value=${form.data.positives} /> </label>
    <label>Expected results: <input type="text" name="expectedResult" .value=${form.data.expectedResult} /> </label>
    <label>Image URL: <input type="text" name="imageUrl" .value=${form.data.imageUrl} /> </label>
    <label>Body zone:
        <select name="zone" required>
            ${bodyZoneOptionsTemplate(form.data.zone)}
        </select>
    </label>
    <label>Procedure type:
        <select name="type" required>
            ${typeOptionsTemplate(form.data.type)}
        </select> </label>
    <input type="submit" value="Edit" />
</form>
`
async function onSubmitHandler(ctx, { title, description, positives, expectedResult, imageUrl, zone, type }) {
    if (title == '') {
        return alert('Title is required!')
    }
    if (description == '') {
        return alert('description is required!')
    }
    if (positives == '') {
        return alert('positives is required!')
    }
    if (expectedResult == '') {
        return alert('expectedResult is required!')
    }
    if (imageUrl == '') {
        return alert('expectedResult is required!')
    }
    const data = {
        title,
        description,
        positives,
        expectedResult,
        zone,
        type,
        imageUrl
    }
    const userId = ctx.user?.objectId;
    if (userId) {
        await updateOne(ctx.params.id, data, userId);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
    // ctx.page.redirect('/')
}

export function showEditView(ctx, next) {
    let form = {
        onSubmit: createSubmitHandler(onSubmitHandler.bind(null, ctx)),
        data: ctx.data
    }
    ctx.render(editTemplate(form));
}
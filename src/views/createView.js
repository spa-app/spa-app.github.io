import { html } from "../../lib/lit-html.js";
import { createOne } from "../data/procedureService.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (form) => html`
<form @submit=${form.onSubmit} class="form">
    <h3>Creating procedure</h3>
    <label>Procedure title: <input type="text" name="title" /> </label>
    <label>Description: <textarea name="description" id="" cols="30" rows="4"></textarea> </label>
    <label>Positives: <input type="text" name="positives" /> </label>
    <label>Expected results: <input type="text" name="expectedResult" /> </label>
    <label>Image URL: <input type="text" name="imageUrl" /> </label>
    <label>Body zone:
        <select name="zone" required>
            <option value="" selected disabled>Избери зона на тялото</option>
            <option value="face">Лице</option>
            <option value="legs">Крака</option>
            <option value="whole-body">Цяло тяло</option>
        </select>
    </label>
    <label>Procedure type:
        <select name="type" required>
            <option value="" selected disabled>Select an Option</option>
            <option value="1">Test 1</option>
            <option value="2">Test 2</option>
        </select> </label>
    <input type="submit" value="Create" />
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
        await createOne(data, userId);
        ctx.page.redirect('/home');
    }
    ctx.page.redirect('/')
}

export function showCreateView(ctx, next) {
    let form = {
        onSubmit: createSubmitHandler(onSubmitHandler.bind(null, ctx))
    }
    ctx.render(createTemplate(form));
}
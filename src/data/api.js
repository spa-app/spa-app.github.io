import { getUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';
const appId = 'FIW8sfmxUqeXePnlUnuCpCSC4AzwWzY8GZWPazBC';
const apiKey = 'gIP2SNdmivWJICNGaqGJF1hMMxjQs2l6eTpRbDiI';


async function request(method, url, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey,
        }
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }

    try {
        const response = await fetch(host + url, options);
        if (response.status == 204) {
            return response;
        }

        const result = await response.json();

        if (response.ok != true) {
            console.log(result);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        alert(error);
        throw error;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const update = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
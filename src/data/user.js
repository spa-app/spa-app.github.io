import { removeUserData, saveUserData } from "../util.js";
import { post } from "./api.js";


export async function register(email, password, username) {
    const { objectId, sessionToken } = await post('/users', { email, password, username });
    const userData = {
        sessionToken,
        objectId,
        email,
        username
    }
    saveUserData(userData);
}

export async function login(email, password) {
    let { sessionToken, objectId, username } = await post('/login', { email, password });
    const userData = {
        sessionToken,
        objectId,
        username,
        email
    }
    saveUserData(userData);
}
export function logout() {
    removeUserData();
}
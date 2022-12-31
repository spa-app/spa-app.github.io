import { addOwner } from '../util.js';
import * as api from './api.js'

const endpoints = {
    'procedures': '/classes/Procedure'
}
export async function getAll(ownerId) {
    let url = endpoints.procedures;
    if (ownerId) {
        let ownerQuery = {
            owner: {
                "__type": "Pointer",
                "className": "_User",
                "objectId": ownerId
            }
        }
        url += `?where=${encodeURIComponent(JSON.stringify(ownerQuery))}`
    }
    // if(hasCount){
    //     url += '?count=1'
    // }

    return api.get(url);
}

export async function getOne(procedureId) {
    return api.get(`${endpoints.procedures}/${procedureId}`);
}
export async function createOne(procedureData, userId) {
    return api.post(endpoints.procedures, addOwner(procedureData, userId));
}
export async function updateOne(procedureId, procedureData, userId) {
    return api.update(`${endpoints.procedures}/${procedureId}`, addOwner(procedureData, userId));
}

export async function deleteOne(procedureId, userId) {
    return api.del(`${endpoints.procedures}/${procedureId}`, addOwner({}, userId));
}


export function saveUserData(session) {
    sessionStorage.setItem('userData', JSON.stringify(session));
}
export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}
export function removeUserData() {
    return sessionStorage.removeItem('userData');
}

//creating, updating records in Back4app
export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    }
}
export function addOwner(record, ownerId) {
    const data = Object.assign({}, record);
    data.owner = createPointer('_User', ownerId);
    return data;
}

export function createSubmitHandler(callback) {

    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries([...formData].map(([k, v]) => [k, v.trim()]));
        callback(data, event)
    }
}
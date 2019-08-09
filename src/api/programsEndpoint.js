export const getProgramsEndpoint = () => {
    const ENDPOINT = '/programs';
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};
export const getProgramsEndpoint = () => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/programs';
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};
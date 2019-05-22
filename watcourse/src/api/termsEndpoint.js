export const getTermsEndpoint = (accessToken, userId) => {
    const ENDPOINT = '/term';
    return fetch(ENDPOINT, { headers: { 'Authorization': accessToken, 'UserID' : userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};
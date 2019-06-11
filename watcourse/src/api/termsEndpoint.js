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

export const addTermEndpoint = (accessToken, userId, termNum, termYear) => {
    const ENDPOINT = '/term'; 
    return fetch(ENDPOINT, { 
        method: 'POST',
        headers: { 
            'Authorization': accessToken, 
            'UserID' : userId 
        },
        body: JSON.stringify({
            'term_number': termNum,
            'year': termYear,
        })
    });
}

export const removeTermEndpoint = (accessToken, userId, termId) => {
    const ENDPOINT = '/term'; 
    return fetch(ENDPOINT, { 
        method: 'DELETE',
        headers: { 
            'Authorization': accessToken, 
            'UserID' : userId 
        },
        body: JSON.stringify({
            'term_id': termId
        })
    });
}
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

export const addTermEndpoint = (accessToken, userId, termNum, termYear, name) => {
    const ENDPOINT = '/term'; 
    return fetch(ENDPOINT, { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': accessToken, 
            'UserID' : userId 
        },
        body: JSON.stringify({
            'term_number': termNum,
            'year': termYear,
            'name': name,
        })
    });
}

export const removeTermEndpoint = (accessToken, userId, termId) => {
    const ENDPOINT = '/term'; 
    return fetch(ENDPOINT, { 
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': accessToken, 
            'UserID' : userId 
        },
        body: JSON.stringify({
            'term_id': termId
        })
    });
}
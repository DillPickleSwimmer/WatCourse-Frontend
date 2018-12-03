export const getTermEndpoint = ( termId, accesToken, userId ) => {
    const ENDPOINT = `/term/${termId}/courses`;    // update this
  
    return fetch(ENDPOINT, { headers: { 'Authorization': accesToken, 'UserID' : userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export const getTermsEndpoint = (accessToken, userId) => {
    const ENDPOINT = `/term`;    // update this
  
    return fetch(ENDPOINT, { headers: { 'Authorization': accessToken, 'UserID' : userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json)
            return json;
        });
};

export const putTermsEndpoint = (terms) => {
    const ENDPOINT = ``;    // update this
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export const getTermsEndpoint = () => {
    const ENDPOINT = ``;    // update this
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
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
  
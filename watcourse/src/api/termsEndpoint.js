export const getTermEndpoint = ( termId, accesToken, userId ) => {
    const ENDPOINT = `/term/${termId}/courses`;
  
    return fetch(ENDPOINT, { headers: { 'Authorization': accesToken, 'UserID' : userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export const getTermsEndpoint = (accessToken, userId) => {
    const ENDPOINT = '/term';    // update this
    return fetch(ENDPOINT, { headers: { 'Authorization': accessToken, 'UserID' : userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export const putTermsEndpoint = (accessToken, userId, term, course) => {
    const ENDPOINT = `/term/${term}/courses`;
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify({ 'course_id': course.id })
    });
};

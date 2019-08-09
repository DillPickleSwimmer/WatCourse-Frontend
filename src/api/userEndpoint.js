export const putUser = (accessToken, programId, startYear, startTrimester) => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/signup';
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
        body: JSON.stringify(
            { 
                program_id : programId < 0 ? null : programId,
                first_term_year : startYear,
                first_term_number : startTrimester
            }) 
    });
};

export const getUserExists = (accesToken) => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/user_exists';
    return fetch(ENDPOINT, { headers: { 'Authorization': accesToken } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};
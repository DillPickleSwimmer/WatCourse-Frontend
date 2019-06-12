export const putUser = (accessToken, program_id) => {
    const ENDPOINT = '/signup';
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
        body: JSON.stringify({ program_id : program_id < 0 ? null : program_id }) 
    });
};

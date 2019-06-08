export const putUser = (accessToken, userId) => {
    const ENDPOINT = '/signup';
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId,
        },
        body: ''
    });
};
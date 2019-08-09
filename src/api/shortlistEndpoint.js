
const ENDPOINT = 'https://watcourse-api.herokuapp.com/shortlist/courses'

export const getShortlistEndpoint = (accessToken, userId) => {
    return fetch(ENDPOINT, { headers: { 'Authorization': accessToken, 'UserID': userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export const postShortlistEndpoint = (accessToken, userId, courseId) => {
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId,
        },
        body: JSON.stringify({ 'course_id': courseId })
    });
};

export const deleteShortlistEndpoint = (accessToken, userId, courseId) => {
    return fetch(ENDPOINT, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId,
        },
        body: JSON.stringify({ 'course_id': courseId })
    });
};

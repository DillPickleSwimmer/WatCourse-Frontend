export const getTermCoursesEndpoint = (termId, accesToken, userId) => {
    const ENDPOINT = `/term/${termId}/courses`;

    return fetch(ENDPOINT, { headers: { 'Authorization': accesToken, 'UserID': userId } })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export const putTermCourseEndpoint = (accessToken, userId, term, courseId) => {
    const ENDPOINT = `/term/${term}/courses`;
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify({ 'course_id': courseId })
    });
};

export const deleteTermCourseEndpoint = (accessToken, userId, term, courseId) => {
    const ENDPOINT = `/term/${term}/courses`;
    return fetch(ENDPOINT, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify({ 'course_id': courseId })
    });
};
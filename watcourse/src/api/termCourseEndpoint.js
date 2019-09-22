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

export const putTermCourseEndpoint = (accessToken, userId, termId, course) => {
    const ENDPOINT = `/term/${termId}/courses`;
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify({ 'course_id': course.id })
    }).then(response => {
        return response.json();
    }).then(json => {
        return json;
    });
};

export const deleteTermCourseEndpoint = (accessToken, userId, termId, course) => {
    const ENDPOINT = `/term/${termId}/courses`;
    return fetch(ENDPOINT, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify({ 'course_id': course.id })
    });
};

export const moveTermCourseEndpoint = (accessToken, userId, fromTermId, toTermId, course) => {
    const ENDPOINT = `move_course_between_terms`;
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify({ 'course_id': course.id, 'from_term_id': fromTermId, 'to_term_id': toTermId })
    });
};


const ENDPOINT = `/shortlist/courses`

export const getShortlist = (accessToken, userId) => {
    return fetch(ENDPOINT, { headers: { 'Authorization': accessToken, 'UserID': userId } })
        .then(response => {
            return response.json()
        })
        .then(json => {
            return json
        })
}

export const postShortlist = (accessToken, userId, courseId) => {
    console.log('courseid is:' + JSON.stringify(courseId))
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId,
        },
        body: JSON.stringify({ 'course_id': courseId })
    })
}

export const deleteShortlist = (accessToken, userId, courseId) => {
    console.log('deleteShortlist - courseid is:' + JSON.stringify(courseId))
    return fetch(ENDPOINT, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId,
        },
        body: JSON.stringify({ 'course_id': courseId })
    })
}

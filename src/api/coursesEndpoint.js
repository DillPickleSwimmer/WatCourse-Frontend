export const getCoursesEndpoint = () => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/courses';    // update this
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json(); 
        })
        .then(json => {
            return json;
        });
};
  
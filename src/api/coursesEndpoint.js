export const getCoursesEndpoint = () => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/courses';
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json(); 
        })
        .then(json => {
            return json;
        });
};
  
export const getFlowCourseEndpoint = (courseName) => {
    const ENDPOINT = `https://uwflow.com/api/course-search?keywords=${courseName}`;  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
            // get first course object
            // Assume the first course is the expected one.
            return json['course_objs'][0];
        });
};
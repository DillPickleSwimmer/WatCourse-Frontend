export const getCoursePrereqsEndpoint = (subject, number) => {
    const ENDPOINT = `https://watcourse-api.herokuapp.com/prereq/tree/get?subject=${subject.toUpperCase()}&number=${number}`;
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json(); 
        })
        .then(json => {
            return json;
        });
};
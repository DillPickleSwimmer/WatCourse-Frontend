export const getCoursePrereqsEndpoint = (subject, number) => {
    const ENDPOINT = `/prereq/tree/get?subject=${subject}&number=${number}`;
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json(); 
        })
        .then(json => {
            return json;
        });
};
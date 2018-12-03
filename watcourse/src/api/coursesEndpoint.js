export const getCoursesEndpoint = (param) => {
    const ENDPOINT = `/courses`;    // update this
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json(); 
        })
        .then(json => {
            return json;
        });
  };
  
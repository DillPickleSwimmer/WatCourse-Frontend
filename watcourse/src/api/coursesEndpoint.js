export const getCoursesEndpoint = (param) => {
    const ENDPOINT = ``;    // update this
  
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
  };
  
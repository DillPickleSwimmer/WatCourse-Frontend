/*const CLIENT_ID = 'blah';
const CLIENT_SECRET = 'blahblah';
const basicAuth = () => 'Basic '.concat(window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`));
const authParameters = {
  headers: {
    Authorization: basicAuth()
  }
};*/

export const sampleEndpoint = () => {
    const ENDPOINT = 'https://api.chucknorris.io/jokes/random';

    return fetch(ENDPOINT/*, authParameters*/)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

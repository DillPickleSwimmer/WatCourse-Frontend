export const postTranscriptEndpoint = (accessToken, transcript) => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/transcript';
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
        body: JSON.stringify(
            { 
                transcript: JSON.stringify(transcript)
            }) 
    });
};
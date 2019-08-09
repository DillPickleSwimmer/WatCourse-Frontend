export const reportBugEndpoint = (accessToken, userId, msg, screenshots) => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/bug';    

    var data = new FormData();
    data.append('bugs', msg);
    console.log(screenshots[0]);
    if(screenshots)
        data.append('screenshot', screenshots[0]);

    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': accessToken,
            'UserID': userId
        },
        body: data 
    });
};
  
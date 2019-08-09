export const submitFeedbackEndpoint = (accessToken, userId, satisfaction, helpful, challenges, features) => {
    const ENDPOINT = 'https://watcourse-api.herokuapp.com/feedback';    
  
    return fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'UserID': userId
        },
        body: JSON.stringify(
            { 
                satisfaction, helpful, challenges, features
            }
        ) 
    });
};
  
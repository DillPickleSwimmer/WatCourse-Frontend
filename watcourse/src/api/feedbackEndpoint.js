export const submitFeedbackEndpoint = (accessToken, userId, satisfaction, helpful, challenges, features) => {
    const ENDPOINT = '/feedback';    
  
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
  
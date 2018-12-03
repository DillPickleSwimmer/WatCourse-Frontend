import { GET_COURSES_SUCCESS } from '../actions/types';

// todo set this to []
const initialState = [
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
    {
        code: "CS343",
        name: "Concurrent Programming",
        description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
        prereqs: "A tormented soul is not required but recommended.",  
    },
];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COURSES_SUCCESS:
            return action.courses || state;   
        default:
            return state;
    }
}
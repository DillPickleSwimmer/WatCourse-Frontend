import { GET_COURSES_SUCCESS } from '../actions/types';

// todo set this to []
const initialState = [
    {
        id: 1,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 2,
        code: 'CS346',
        name: 'ConcurrenCY',
        description: 'special boii',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 3,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 4,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 5,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 6,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 7,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 8,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
    },
    {
        id: 9,
        code: 'CS343',
        name: 'Concurrent Programming',
        description: 'A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!',
        prereqs: 'A tormented soul is not required but recommended.',  
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
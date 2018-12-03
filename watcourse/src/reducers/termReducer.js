import { GET_TERMS_SUCCESS } from '../actions/types';

// todo set this to []
const initialState = [
    // {
    //     season: 'Fall',
    //     year: 2015,
    //     term: '1A',
    //     id: 1, 
    //     courses: [
    //         {
    //             courseCode: 'CS137',
    //             courseName: 'Programming Principles',
    //             defaultCourse: true,
    //         },
    //         {
    //             courseCode: 'CS137',
    //             courseName: 'Programming Principles',
    //             defaultCourse: false,
    //         }
    //     ]
    // },
    // {
    //     season: 'Fall',
    //     year: 2015,
    //     term: '1A',
    //     id: 2, 
    //     courses: [
    //         {
    //             courseCode: 'CS137',
    //             courseName: 'Programming Principles',
    //             defaultCourse: true,
    //         }
    //     ]
    // },
    // {
    //     season: 'Fall',
    //     year: 2015,
    //     term: '1A',
    //     id: 3, 
    //     courses: [
    //         {
    //             courseCode: 'CS137',
    //             courseName: 'Programming Principles',
    //             defaultCourse: true,
    //         }
    //     ]
    // },
];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TERMS_SUCCESS:
            return [
                ...state.filter(term => action.term.id !== term.id), 
                action.term
            ]; 
        default:
            return state;
    }
}
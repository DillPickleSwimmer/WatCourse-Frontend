import { GET_TERMS_SUCCESS } from '../actions/types';

// todo set this to []
const initialState = [
    {
        season: 'Fall',
        year: 2015,
        term: '1A',
        courses: [
            {
                courseCode: 'CS137',
                courseName: 'Programming Principles',
                defaultCourse: true,
            },
            {
                courseCode: 'CS137',
                courseName: 'Programming Principles',
                defaultCourse: false,
            }
        ]
    },
    {
        season: 'Fall',
        year: 2015,
        term: '1A',
        courses: [
            {
                courseCode: 'CS137',
                courseName: 'Programming Principles',
                defaultCourse: true,
            }
        ]
    },
    {
        season: 'Fall',
        year: 2015,
        term: '1A',
        courses: [
            {
                courseCode: 'CS137',
                courseName: 'Programming Principles',
                defaultCourse: true,
            }
        ]
    },
];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TERMS_SUCCESS:
            return action.terms || state;    
        default:
            return state;
    }
}
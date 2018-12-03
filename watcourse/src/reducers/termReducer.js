import { 
    GET_TERMS_SUCCESS,
    ADD_TO_TERM, REMOVE_FROM_TERM, 
} from '../actions/types';

// todo set this to []
const initialState = [
    {
        id: 1,
        season: 'Fall',
        year: 2015,
        term: '1A',
        courses: [
            {
                id: 4,
                code: "CS343",
                name: "Concurrent Programming",
                description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
                prereqs: "A tormented soul is not required but recommended.",  
                defaultCourse: true,
            },
            {
                id: 5,
                code: "CS343",
                name: "Concurrent Programming",
                description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
                prereqs: "A tormented soul is not required but recommended.",  
            },
            {
                id: 6,
                code: "CS343",
                name: "Concurrent Programming",
                description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
                prereqs: "A tormented soul is not required but recommended.",  
            },
        ]
    },
    {
        id: 2,
        season: 'Fall',
        year: 2016,
        term: '2A',
        courses: [
            {
                id: 6,
                code: "CS343",
                name: "Concurrent Programming",
                description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
                prereqs: "A tormented soul is not required but recommended.",  
            },
        ]
    },
    {
        id: 3,
        season: 'Fall',
        year: 2017,
        term: '3A',
        courses: [
            {
                id: 6,
                code: "CS343",
                name: "Concurrent Programming",
                description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
                prereqs: "A tormented soul is not required but recommended.",  
            },
        ]
    },
];

//need to sort these terms in order to maintain order
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TERMS_SUCCESS:
            return action.terms || state;  
        case ADD_TO_TERM:
        console.log(action);
            var addTerm = state.find(term=>term.id === action.term);
            addTerm.courses = [
                ...addTerm.courses.filter(course=>course.id !== action.course.id),
                action.course
            ];
            return [
                ...state.filter(term=>term.id !== addTerm.id), 
                addTerm
            ];
        case REMOVE_FROM_TERM: 
            var removeTerm = state.find(term=>term.id === action.term);
            removeTerm.courses = [
                ...removeTerm.courses.filter(course=>course.id !== action.course.id),
            ];
            return [
                ...state.filter(term=>term.id !== removeTerm.id), 
                removeTerm
            ];
        default:
            return state;
    }
}
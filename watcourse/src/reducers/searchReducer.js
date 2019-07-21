import { 
    UPDATE_COURSE_SEARCH,
    INCREASE_COURSE_SEARCH_RESULTS,
} from '../actions/types';


function filterString(s) {
    return s.toUpperCase().replace(/\s/g,'').replace(/\W/g, '');
}

function getResults(courses, filteredQuery) {
    return courses.filter((course) => 
        filterString(course.subject + course.num).substring(0, filteredQuery.length) === filteredQuery ||
        filterString(course.title).substring(0, filteredQuery.length) === filteredQuery
    );
}

const DEFAULTRESULTS = 20;

const initialState = {query: '', results: [], numDisplayedResults: DEFAULTRESULTS, numResults: 0};

export default function (state = initialState, action) {
    switch (action.type) {
    case UPDATE_COURSE_SEARCH:
        if ( !action.query || !action.query.length ) return initialState;    // reset
        var filteredQuery = filterString(action.query);
        var results = getResults(action.courses, filteredQuery);
        return {
            query: filteredQuery,
            numDisplayedResults: DEFAULTRESULTS, 
            results: results.slice(0, DEFAULTRESULTS),
            numResults: results.length,
        }
    case INCREASE_COURSE_SEARCH_RESULTS:
        var results = getResults(action.courses, state.query);
        return {
            query: state.query,
            numDisplayedResults: state.numDisplayedResults + DEFAULTRESULTS,
            results: results.slice(0, state.numDisplayedResults + DEFAULTRESULTS),
            numResults: results.length,
        }
    default:
        return state;
    }
}
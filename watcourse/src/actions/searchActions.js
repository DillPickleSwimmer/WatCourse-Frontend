import {
    UPDATE_COURSE_SEARCH, INCREASE_COURSE_SEARCH_RESULTS
} from '../actions/types';

const updateCourseSearchQueryGivenCourses = (query, courses) => ({
    type: UPDATE_COURSE_SEARCH, query, courses
});

export const updateCourseSearchQuery = (query) => (dispatch, getState) => {
    const { courses } = getState();
    dispatch(updateCourseSearchQueryGivenCourses(query, courses));
};

const loadMoreResultsGivenCourses = (courses) => ({
    type: INCREASE_COURSE_SEARCH_RESULTS, courses
});

export const loadMoreResults = (query) => (dispatch, getState) => {
    const { courses } = getState();
    dispatch(loadMoreResultsGivenCourses(courses));
};

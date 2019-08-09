import { PropTypes } from 'prop-types';

// Course Type

export const CourseType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string,
    num: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    prereqs: PropTypes.string, 
    defaultCourse: PropTypes.bool,
    arePrereqsMet: PropTypes.bool,
    pending: PropTypes.bool,
    requestFailed: PropTypes.bool,
});

// Term Type

export const TermNumNames = ["Winter", "Spring", "Fall", null];

export const TermType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    termNum: PropTypes.number.isRequired,
    termYear: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, 
    courses: PropTypes.arrayOf(CourseType),
    oldDisplayInfo: PropTypes.object,
});

// Course Search Type
export const CourseSearchType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prereqs: PropTypes.string,  
});

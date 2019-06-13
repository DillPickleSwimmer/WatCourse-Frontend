import { PropTypes } from 'prop-types';

// Course Type

export const CourseType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prereqs: PropTypes.string, 
    defaultCourse: PropTypes.bool,
    arePrereqsMet: PropTypes.bool.isRequired,
});

// Term Type

export const TermType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    termNum: PropTypes.number.isRequired,
    termYear: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, 
    courses: PropTypes.arrayOf(PropTypes.number)
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

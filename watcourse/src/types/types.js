import { PropTypes } from 'prop-types';

// Course Type

export const CourseType = PropTypes.shape({
    courseCode: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    defaultCourse: PropTypes.bool,
});

// Term Type

export const TermType = PropTypes.shape({
    season: PropTypes.oneOf(['Fall', 'Spring', 'Winter']).isRequired,
    year: PropTypes.number.isRequired, 
    term: PropTypes.string.isRequired, 
    courses: PropTypes.arrayOf(CourseType)
});

// Course Search Type
export const CourseSearchType = PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prereqs: PropTypes.string,  
});

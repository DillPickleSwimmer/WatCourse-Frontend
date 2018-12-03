import { PropTypes } from 'prop-types';

// Course Type

export const CourseType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prereqs: PropTypes.string, 
    defaultCourse: PropTypes.bool
});

// Term Type

export const TermType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    season: PropTypes.oneOf(['Fall', 'Spring', 'Winter']).isRequired,
    year: PropTypes.number.isRequired, 
    term: PropTypes.string.isRequired, 
    courses: PropTypes.arrayOf(CourseType)
});

// Course Search Type
export const CourseSearchType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    prereqs: PropTypes.string,  
});

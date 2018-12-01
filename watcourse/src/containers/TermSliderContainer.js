import { connect } from 'react-redux';
import TermSlider from '../components/TermSlider';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    terms: [
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
    ]
});

// connect component w/ redux store
export default connect(mapStateToProps)(TermSlider);
import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
import CourseCard from './CourseCard.js';

class TermSlider extends Component {
    render() {
        return (
        <div className="TermSlider">
            <TermCard 
                season="Fall" 
                year={2015} 
                term="1A" 
                courses={[
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                ]}
            />
            <TermCard 
                season="Fall" 
                year={2015} 
                term="1A" 
                courses={[
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                ]}
            />
            <TermCard 
                season="Fall" 
                year={2015} 
                term="1A" 
                courses={[
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                    (<CourseCard courseCode="CS137" courseName="Programming Principles"/>),
                ]}
            />
        </div>
        );
    }
}

TermSlider.propTypes = {
};

export default TermSlider;

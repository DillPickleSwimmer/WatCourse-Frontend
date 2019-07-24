// REQUEST - attempts to do the move; set the course pending state; validate course not already pending 
export function moveCourseRequest(doMove, course, state) {
    // need to have a copy in case of simultaneous related movements
    var newCourse = {...course};

    // don't move a course in temp state
    if (course.pending) {
        newCourse.requestFailed = true;
        return state;
    }

    // set pending state
    newCourse.pending = true; 
    newCourse.requestFailed = false;

    // attempt move
    return doMove(newCourse);
}

// SUCCESS - accept the move; reset pending state, update course state
export function moveCourseSuccess(updateCourseState, course, state) {
    // need to have a copy in case of simultaneous related movements
    var newCourse = {...course};

    // reset pending state
    newCourse.pending = false; 
    newCourse.requestFailed = false;

    // update the pending state in the course state
    return updateCourseState(newCourse);
}

// ERROR - undo the move; reset pending state 
export function moveCourseError(undoMove, course, state) {
    // need to have a copy in case of simultaneous related movements
    var newCourse = {...course};

    // reset pending state
    newCourse.pending = false; 
    newCourse.requestFailed = false;

    // undo the move
    return undoMove(newCourse);
}

export function validateMoveCourseRequest(course) {
    if(course.requestFailed) {
        throw Error("Action failed, course is still pending success.");
    }
}
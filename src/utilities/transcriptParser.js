// Subject are in all caps. 
function isSubject(subject) {
    return subject === subject.toUpperCase();
}
  
// Returns { subject, num } from course string or null
function parseCourse(courseStr) {
    if (courseStr == null) return null;
    const courseStrArr = courseStr.split(' ');
    if (courseStrArr.length < 2) return null;
    const subject = courseStrArr[0];
    if (!isSubject(subject)) return null;
    const num = courseStrArr[1];
    return { subject, num };
}

// Take trimmester to to int: "Fall 2015" => 3
function parseTermNum(termStr){
    if (termStr.includes('Fall')) {
        return 3;
    } else if (termStr.includes('Winter')) {
        return 1;
    } else {
        return 2;
    }
}

function parseTerm(termText) {
    if (!termText) return null;
    const term = {};
    const termTextArr = termText.split(/\n/);
    
    // "Level: 1B Load: Part-Time Form Of Study: Co-op Work Term" => 1B
    const regexArr = termTextArr[2].match(/\d(A|B)/);
    if (!regexArr) return null;
    term.name = regexArr[0];

    term.term_number = parseTermNum(termTextArr[0]);
    term.year = termTextArr[0].match(/\d{4}$/)[0];
  
    // Get courses
    const courses = [];
    for (let i = 4; i < termTextArr.length; i++) {
        const courseStr = termTextArr[i];
        const course = parseCourse(courseStr);
        if (course == null) break;
        courses.push(course);
    }
    term.courses = courses;
  
    return term;
}
  
function parseTranscript(text) {
    let termsTextArr = text.split(/\n\n/).slice(2);
    return termsTextArr.map(parseTerm).filter(term => term != null);
}

export default parseTranscript;
  
    
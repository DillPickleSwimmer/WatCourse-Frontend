import { connect } from 'react-redux';
import TermSlider from '../components/TermSlider';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => {
    var terms = []; 
    state.terms.forEach(term => {
        if(term) {
            terms.push(term);
        }
    })
    if ( terms ) { 
        terms.sort( (a, b) => ( a && b && a.name < b.name ? -1 : 1));           // ternary sort on name
        terms.sort( (a, b) => ( a && b && a.termNum < b.termNum ? -1 : 1));     // secondary sort on term
        terms.sort( (a, b) => ( a && b && a.termYear < b.termYear ? -1 : 1));   // primary sort on year
    }
    return ({
        terms: terms || [],
        courses: state.courses || []
    })
};

// connect component w/ redux store
export default connect(mapStateToProps)(TermSlider);
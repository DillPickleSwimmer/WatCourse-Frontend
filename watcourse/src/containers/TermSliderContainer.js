import { connect } from 'react-redux';
import TermSlider from '../components/TermSlider';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    terms: state.terms ? state.terms.sort( 
        (a, b) => ( a.year < b.year ? -1 : (a.term_number < b.term_number ? -1 : 1))
    ) : [],
    courses: state.courses || []
});

// connect component w/ redux store
export default connect(mapStateToProps)(TermSlider);
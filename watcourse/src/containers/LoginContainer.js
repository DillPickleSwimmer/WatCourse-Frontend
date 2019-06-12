import { connect } from 'react-redux';
import Login from '../components/Login';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    auth: state.auth.authenticated, 
    error: state.auth.error && state.auth.error.message,
});

// connect component w/ redux store
export default connect(mapStateToProps)(Login);
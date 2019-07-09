import { connect } from 'react-redux';
import Login from '../components/Login';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    auth: state.auth.authenticated,
    page: state.auth.page, 
    showPasswordReset: state.auth.showPasswordReset,
    msg: state.auth.msg,
    error: state.auth.error,
});

// connect component w/ redux store
export default connect(mapStateToProps)(Login);
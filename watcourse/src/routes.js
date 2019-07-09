import React, { Component } from "react";
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';
import Main from './components/Main';
import sampleContainer from './containers/sampleContainer';
import SignUpContainer from './containers/SignUpContainer';
import LoginContainer from './containers/LoginContainer';
import Test from './components/test/Test';

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}> 
                    <IndexRoute component={Main} />
                    <Route exact path="sample" component={sampleContainer} />
                    <Route exact path="login" component={LoginContainer} />
                    <Route exact path="signup" component={SignUpContainer} />
                    <Route exact path="test" component={Test} />
                </Route>
            </Router>
        );
    }
}

export default Routes;
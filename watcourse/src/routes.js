import React from 'react'; 
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Main from './components/Main';
import sampleContainer from './containers/sampleContainer';

// Map components to different routes.
// The parent component wraps other components and thus serves as  the entrance to 
// other React components.
// IndexRoute maps component to the default route
export default (
  <Route path="/" component={App}> 
    <IndexRoute component={Main} />
    <Route path="sample" component={sampleContainer} />
  </Route>
);
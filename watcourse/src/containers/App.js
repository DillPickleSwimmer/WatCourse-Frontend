import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* header */}
        <p>Test</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;

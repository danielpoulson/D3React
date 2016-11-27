import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css';
import './css/styles.css';
import Vistors from './vistors';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Vistors className="top" />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css';
import './css/styles.css';
import BarChart  from './bar-chart';
import LineChart  from './line-chart';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <BarChart className="" />
        </div>
        <div className="row">
          <LineChart className="" />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css';
import './css/styles.css';
import BarChart  from './bar-chart';
import LineChart  from './chart/line-chart/line-chart';
import LineChartNew  from './chart/line-chart/line-chart-new';
import Messing  from './messing.js';

class App extends Component {
  render() {
    
    const stylemessing = {
      paddingTop: 20,
      paddingLeft : 20
    }

    return (
      <div className="container">
        <div className="row">
          <LineChart className="" />
        </div>
        <div className="row">
          <LineChartNew className="" />
        </div>
        <div className="row" style={stylemessing}>
          <Messing className="" />
        </div>
      </div>
    );
  }
}

export default App;

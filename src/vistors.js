import React from 'react';
import LineChart from './linechart';

class Vistors extends React.Component {
  render() {
    return (
      <div>
        <h3>Visitors to your site</h3>
        <div className="bottom-right-svg">
            <LineChart/>
        </div>
      </div>
    );
  }
}

export default Vistors;

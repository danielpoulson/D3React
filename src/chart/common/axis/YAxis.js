import React, { Component } from 'react';
import * as d3 from 'd3';
import AxisLine from './axis-line';

class YAxis extends Component {
	render() {
		const props = this.props;
		const t = `translate(${props.yAxisOffset}, 0)`;
		return (
	      <g className={props.yAxisClassName} transform={t} >
	      	<AxisLine h={props.h} orient={props.yOrient} />
	      </g>
		);
	}
}

YAxis.defaultProps = {
  fill:           'none',
  stroke:         '#000',
  strokeWidth:    '1',
  tickStroke:     '#000',
  yAxisClassName: 'rd3-y-axis',
  yAxisLabel:     '',
  yAxisOffset:    0,
  xOrient:        'bottom',
  yOrient:        'left'
}

export default YAxis;

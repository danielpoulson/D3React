import React, { Component } from 'react';
import * as d3 from 'd3';
import AxisLine from './axis-line';
import AxisTicks from './AxisTicks';

class XAxis extends Component {
	render() {
		const props = this.props;
		const t = `translate(0 ,${props.h})`;

		return (
	      <g className={props.xAxisClassName} transform={t} >
	      	<AxisLine d={props.line} w={props.w} orient={props.xOrient} />
	      	<AxisTicks data={props.data} x={props.x} y={props.y}/>
	      </g>
		);
	}
}

XAxis.defaultProps = {
  fill:            'none',
  stroke:          'none',
  strokeWidth:     '1',
  tickStroke:      '#000',
  xAxisClassName:  'rd3-x-axis',
  xAxisLabel:      '',
  xAxisLabelOffset: 10,
  xAxisOffset:      0,
  xOrient:         'bottom',
  yOrient:         'left'
}

export default XAxis;

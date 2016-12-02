import React, { Component } from 'react';
import * as d3 from 'd3';

class AxisLine extends Component {
	render() {
		const props = this.props;

		let range;

		var sign = props.orient === "top" || props.orient === "left" ? -1 : 1;

		let d;

	    if (props.orient === "bottom" || props.orient === "top") {
	    	range = [0, props.w];
	      	d = "M" + range[0] + "," + sign * props.outerTickSize + "V0H" + range[1] + "V" + sign * props.outerTickSize;
	    } else {
	    	range = [props.h, 0];
	      d = "M" + sign * props.outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * props.outerTickSize;
	    }

		return (
			<path
		        className="domain"
		        d={d}
		        style={{'shapeRendering':'crispEdges'}}
		        fill={props.fill}
		        stroke={props.stroke}
		        strokeWidth={props.strokeWidth} >
      		</path>
		);
	}
}

AxisLine.defaultProps = {
  innerTickSize: 6,
  outerTickSize: 6,
  tickPadding: 3,
  fill: 'none',
  tickArguments: [10],
  tickValues: null,
  tickFormat: null 
};

export default AxisLine;

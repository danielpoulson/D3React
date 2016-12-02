import React, { Component } from 'react';
import * as d3 from 'd3';


export default class AxisTicks extends Component {
	render() {
		const styled = {
			stroke: '#92caf9',
			strokeWidth: 2
		}

		//remove last & first point
	    //const data = this.props.data.splice(1);
	    const data = this.props.data;
	    const _x = this.props.x;
	    const _y = this.props.y;

	    //data.pop();

	    const lines = data.map(function(d,i){
	    	let _val = `translate(${_x(d.date)}, 0)`;
	      return (
	      	
		      	<g key={i} transform={_val}>
		      		<line style={styled} y2="6"  />
		      	</g>
	      	);
	    });

		return (
			<g>
				{lines}
	      	</g>
		);
	}
}

import React, { Component } from 'react';
import * as d3 from 'd3';


export default class AxisTicks extends Component {
	render() {
		const props = this.props;
		const styled = {
			stroke: '#92caf9',
			strokeWidth: 2
		};

		//remove last & first point
		//const data = this.props.data.splice(1);
		const _x = this.props.x;
		const _y = this.props.y;
		let tr;
		let y2;
		let x2;
		let scale;

		//data.pop();

		if (props.orient === "bottom") {
			scale = props.xScale;
			tr = (tick) => `translate(${_x(tick)},0)`;
			y2 = "6";
		} else {
			scale = props.yAxis;
			tr = (tick) => `translate(0, ${tick})`;
			x2 = "-6";
		}

		const lines = props.scale.map(function(d,i){
		// let _val = `translate(${_x(d.date)}, 0)`;
		let _val = tr(d);
		return (
			<g key={i} transform={_val}>
				<line style={styled} y2={y2} x2={x2} />
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

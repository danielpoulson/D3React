import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Messing extends Component {
	render() {

		const styled = {
			stroke: 'black'
		}

		return (
			<svg>

				<line x1="40" y1="20" x2="80" y2="20" style={styled}/>

			</svg>
		);
	}
}

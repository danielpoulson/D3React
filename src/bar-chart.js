import React from 'react';
import * as d3 from 'd3';
import { changeData } from './data';

export default class BarChart extends React.Component{

	componentDidMount(){
		this.renderChart();
	}

	renderChart(){
		const margin = {top: 20, right: 20, bottom: 30, left: 40};
		const width = 500 - margin.left - margin.right;
		const height = 300 - margin.top - margin.bottom;

		let svg = d3.select('#chartArea')
			.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
			.append('g')
				.attr('transform', `translate( ${margin.left}, ${margin.top} )`);

			const data = changeData;
			const _category = ['closed', 'open'];

			data.forEach(function(d) {
				d._object = _category.map(function(name) { return {name: name, value: +d[name]}; });
			});

			//Removes the first element of the array the "Years" item and creates a new array
			//of category names e.g ["closed", "open"]
			// var _category = d3.keys(data[0]).filter(function(key) { return key !== "Years"; });




		// This function is used to make grid lines
		// function make_x_axis() {
		//   return d3.svg.axis()
		//     .scale(x0)
		//      .orient("bottom")
		//      .ticks(5)
		// }

		const x0 = d3.scaleBand()
			.domain(data.map(d => d.Years))
			.rangeRound([0, width], 0.1);

		const x1 = d3.scaleBand()
			.domain(_category)
			.rangeRound([0, x0.bandwidth()]);

		const color = d3.scaleOrdinal()
			.range(["rgba(230, 115, 115, 0.83)", "rgba(244, 67, 54, 0.85)"]);

		const xAxis = d3.axisBottom(x0).ticks(5);

		svg.append('g')
			.attr('transform', `translate( 0, ${height} )`)
			.call(xAxis)
			.selectAll('text')
			.style('text-anchor', 'end')
			.attr('transform', 'rotate(-45)');

		// From the 'data' array 'open' is used to set the domain of y as it always has the largest values which are used to set the height of y.
		const y = d3.scaleLinear()
			.range([height, 0])
			.domain([0, d3.max(data, d => d.open)]);

		const yAxis = d3.axisLeft(y)
			.tickFormat(d3.format(".2s"));



		// This function is used to make grid lines
		function make_y_axis() {
			return d3.axisLeft(y).ticks(5);
		}

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 2)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Change Controls");

		// Adding in x grid lines
		// svg.append("g")
    //   .attr("class", "grid")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(make_x_axis()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat("")
    //   );

		// Adding in y grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
      );

		let state = svg.selectAll(".state")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d) { return "translate(" + x0(d.Years) + ",0)"; });

		state.selectAll("rect")
			.data(d => d._object)
			.enter().append("rect")
			.attr("class", "rectclass")
			.attr("width", x1.bandwidth())
			.attr("x", d => x1(d.name))
			.attr('y', 250)
			.attr('height', 0)
			.style("fill", function(d) { return color(d.name); })
			.transition()
			.duration(2000)
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); })
			.style("fill", function(d) { return color(d.name); });


		let legend = svg.selectAll(".legend")
			.data(_category.slice().reverse())
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", "translate(0,-10)");

		legend.append("rect")
			.attr("x", width - 18)
			.attr("y", function(d, i){ return i *  20;})
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

		legend.append("text")
			.attr("x", width - 24)
			.attr("y", function(d, i){ return i *  20 + 9;})
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d; });
	}


	render(){
		return <div id="chartArea" />;
	}
}

import React, { Component } from 'react';
import * as d3 from 'd3';
import tip from 'd3-tip';
import _ from 'lodash';
import { myData } from './data';

d3.tip = tip;

export default class LineGraph extends Component{

  componentDidMount(){
    this.updateChart();
  }

  updateChart(){
    const margin = {top: 30, right: 20, bottom: 30, left: 50};
    const w = 500 - margin.left - margin.right;
    const h = 300 - margin.top - margin.bottom;
    const data = myData;

    const dates = _.map(data, 'date');
    const counts = _.map(data, 'count');

    /* Initialize tooltip */
    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Overdue:</strong> <span>" + d.count + "</span>";
      });

    let svg = d3
      .select('#chart')
      .append('svg')
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
      .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    const x = d3.scalePoint()
      .domain(dates)
      .range([0, w]);

    const xAxis = d3.axisBottom(x).ticks(5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .range([h, 0]);



    const yAxis = d3.axisLeft(y).ticks(5);

    const line = d3.line()
      .curve(d3.curveLinear)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.count);
      });


    let path = svg.append("path")
      .attr("d", line(data));

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

        // Add the scatterplot
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.date); })
      .attr("cy", function(d) { return y(d.count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    svg.append("g")         // Add the X Axis
        .attr("class", "axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    svg.append("g")         // Add the Y Axis
      .attr("class", "axis")
      .call(yAxis);

  }


  render(){
    return <div id="chart" />;
  }
}

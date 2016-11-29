import React, { Component } from 'react';
import * as d3 from 'd3';
import tip from 'd3-tip';
import _ from 'lodash';
import { myData } from './data';
import Dots from './dots';
import Axis from './axis';

d3.tip = tip;

export default class LineChartNew extends Component{
  constructor(props) {
    super(props);
    this.state = {width: props.width};
  }

  componentDidMount(){
    //this.updateChart();
    this.updateChartNew();
  }

  updateChartNew() {

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
      const margin = {top: 10, right: 50, bottom: 20, left: 50};
      const w = this.state.width - (margin.left + margin.right);
      const h = this.props.height - (margin.top + margin.bottom);

      const data = myData;

      const dates = _.map(data, 'date');
      const counts = _.map(data, 'count');

      const x = d3.scalePoint()
        .domain(dates)
        .range([0, w]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(counts)])
        .range([h, 0]);

        const line = d3.line()
          .curve(d3.curveCardinal)
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.count);
          });

       const transform='translate(' + margin.left + ',' + margin.top + ')';
       const yAxis = d3.axisRight(y).ticks(5);
       const xAxis = d3.axisBottom(x).ticks(5);

    return (
      <div id="chart">
        <svg id={this.props.chartId} width={this.state.width} height={this.props.height} className="svgMain">
          <g transform={transform}>
            <path d={line(data)} />
            <Dots data={data} x={x} y={y}/>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
          </g>
        </svg>
      </div>
    );
  }
}

LineChartNew.propTypes = {
  width:React.PropTypes.number,
  height:React.PropTypes.number,
  chartId:React.PropTypes.string
};

LineChartNew.defaultProps = {
  width: 500,
  height: 300,
  chartId: 'v1_chart'
};

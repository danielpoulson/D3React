import React from 'react';
import * as d3 from 'd3';
import Dots from './dots';
import Grid from './grid';
import Axis from './axis';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {width: props.width};
  }

  render() {
    const data=[
      {day:'02-11-2016',count:180},
      {day:'02-12-2016',count:250},
      {day:'02-13-2016',count:150},
      {day:'02-14-2016',count:496},
      {day:'02-15-2016',count:140},
      {day:'02-16-2016',count:380},
      {day:'02-17-2016',count:100},
      {day:'02-18-2016',count:150}
    ];

    const margin = {top: 5, right: 50, bottom: 20, left: 50};
    const w = this.state.width - (margin.left + margin.right);
    const h = this.props.height - (margin.top + margin.bottom);

    let parseDate = d3.timeParse("%m-%d-%Y");

    data.forEach(function (d) {
       d.date = parseDate(d.day);
   });

   const x = d3.scaleTime()
       .domain(d3.extent(data, function (d) {
           return d.date;
       }))
       .range([0, w]);

   const y = d3.scaleLinear()
       .domain([0,d3.max(data,function(d){
           return d.count+100;
       })])
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

  const xAxis = d3.axisBottom(x)
   .tickValues(data.map(function(d,i){
       if(i>0)
           return d.date;
   }).splice(1))
   .ticks(4);

  const yGrid = d3.axisRight(y)
   .ticks(5)
   .tickSize(-w, 0, 0)
   .tickFormat("");


    return (
      <div>
          <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

              <g transform={transform}>
                  <path className="line shadow" d={line(data)} strokeLinecap="round"/>
                  <Dots data={data} x={x} y={y}/>
              </g>
              <Grid h={h} grid={yGrid} gridType="y"/>
              <Axis h={h} axis={yAxis} axisType="y" />
              <Axis h={h} axis={xAxis} axisType="x"/>
          </svg>
      </div>
    );
  }
}

LineChart.propTypes = {
  width:React.PropTypes.number,
  height:React.PropTypes.number,
  chartId:React.PropTypes.string
};

LineChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart'
};

export default LineChart;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Grid extends Component {
  componentDidMount() { this.renderGrid(); }
  componentDidUpdate() { this.renderGrid(); }

  renderGrid() {
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.grid);
  }

  render() {
    const translate = "translate(0,"+(this.props.h)+")";
    
    return (
      <g className="y-grid" transform={this.props.gridType=='x'?translate:""} />
    );
  }
}

Grid.propTypes = {
  h:React.PropTypes.number,
  grid:React.PropTypes.func,
  gridType:React.PropTypes.oneOf(['x','y'])
};

export default Grid;

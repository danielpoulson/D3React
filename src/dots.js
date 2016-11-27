import React, {Component} from 'react';

class Dots extends Component {
  render() {
    //remove last & first point
    const data = this.props.data.splice(1);
    const _x = this.props.x;
    const _y = this.props.y;

    data.pop();

    const circles = data.map(function(d,i){
      return (<circle className="dot" r="7" cx={_x(d.date)} cy={_y(d.count)}
      fill="#7dc7f4" stroke="#3f5175" strokeWidth="5px" key={i} />);
    });
    return (
      <g>
          {circles}
      </g>
    );
  }
}

Dots.propTypes = {
        data:React.PropTypes.array,
        x:React.PropTypes.func,
        y:React.PropTypes.func

};

export default Dots;

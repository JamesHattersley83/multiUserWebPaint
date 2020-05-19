import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawEvent, mouseDown } from '../actions/actions';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastX: 0,
      lastY: 0,
    };

    this.startPosition = this.startPosition.bind(this);
    this.finishPosition = this.finishPosition.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    // set up the properties of the canvas element.
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
  }

  startPosition({ nativeEvent }) {
    this.props.dispatch(mouseDown(true));
    this.setState({ lastX: nativeEvent.offsetX, lastY: nativeEvent.offsetY });
  }

  finishPosition() {
    this.props.dispatch(mouseDown(false));
    this.ctx.beginPath();
  }

  onMouseMove({ nativeEvent }) {
    if (this.props.draw.mouseDown === true) {
      const { lastX, lastY } = this.state;
      const { offsetX, offsetY } = nativeEvent;

      const A = [lastX, lastY];
      const B = [offsetX, offsetY];

      function slope(a, b) {
        if (a[0] == b[0]) {
          return null;
        }

        return (b[1] - a[1]) / (b[0] - a[0]);
      }

      function intercept(point, slope) {
        if (slope === null) {
          // vertical line
          return point[0];
        }

        return point[1] - slope * point[0];
      }

      const m = slope(A, B);
      const b = intercept(A, m);

      for (let x = A[0]; x <= B[0]; x++) {
        let y = m * x + b;
        this.props.dispatch(drawEvent(x, y, {}));
      }

      this.setState({ lastX: nativeEvent.offsetX, lastY: nativeEvent.offsetY });
    }
  }

  paint(currentX, currentY) {
    this.ctx.beginPath();
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
  }

  render() {
    console.log('from render', this.props.draw.mouseDown);
    const drawData = this.props.draw.drawData;
    drawData.forEach((position) => {
      const { x, y } = position;
      this.paint(x, y);
    });
    return (
      <div>
        <canvas
          ref="canvas"
          onMouseDown={this.startPosition}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.finishPosition}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    draw: state.draw,
  };
};

export default connect(mapStateToProps)(Canvas);

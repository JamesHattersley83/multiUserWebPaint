import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawEvent, mouseDown } from '../actions/actions';
import { calculation } from '../util/calculation';
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

  startPosition(e) {
    this.setState({
      lastX: e.nativeEvent.offsetX,
      lastY: e.nativeEvent.offsetY,
    });
    console.log(this.state.lastX, this.state.lastY);
    this.props.dispatch(mouseDown(true));
  }

  finishPosition() {
    this.props.dispatch(mouseDown(false));
    this.ctx.beginPath();
  }

  onMouseMove(e) {
    if (this.props.draw.mouseDown === true) {
      const { lastX, lastY } = this.state;
      const { offsetX, offsetY } = e.nativeEvent;

      const calcArray = calculation(lastX, lastY, offsetX, offsetY);
      this.props.dispatch(drawEvent(calcArray));
      this.setState({
        lastX: e.nativeEvent.offsetX,
        lastY: e.nativeEvent.offsetY,
      });
    }
  }

  paint(currentX, currentY) {
    this.ctx.beginPath();
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
  }

  render() {
    const drawData = this.props.draw.drawData;
    console.log('drawdata', drawData);
    drawData.forEach((position) => {
      // console.log(position);
      this.paint(position.x, position.y);
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

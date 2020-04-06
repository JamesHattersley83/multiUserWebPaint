import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
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

  isPainting = false;
  prevPos = { offsetX: 0, offsetY: 0 };

  startPosition({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  }

  finishPosition() {
    if (this.isPainting) {
      this.isPainting = false;
    }
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };

      this.paint(this.prevPos, offSetData);
    }
  }

  paint(prevPos, currPos) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  render() {
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

export default Canvas;

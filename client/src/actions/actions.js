import actionTypes from '../constants/actionTypes';

export const drawEvent = (x, y, data) => {
  return {
    type: actionTypes.DRAW_EVENT,
    payload: {
      x: x,
      y: y,
      data: data,
    },
  };
};

export const mouseDown = (status) => {
  return {
    type: actionTypes.TOGGLE_MOUSEDOWN,
    payload: status,
  };
};

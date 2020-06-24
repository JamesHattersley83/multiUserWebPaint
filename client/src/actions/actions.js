import actionTypes from '../constants/actionTypes';

export const drawEvent = (coords) => {
  return {
    type: actionTypes.DRAW_EVENT,
    payload: coords,
  };
};

export const mouseDown = (status) => {
  return {
    type: actionTypes.TOGGLE_MOUSEDOWN,
    payload: status,
  };
};

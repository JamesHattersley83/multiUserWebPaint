import constants from '../constants/actionTypes';

const initialState = {
  drawData: [],
  mouseDown: false,
};

export default (state = initialState, action) => {
  // console.log(action, state);
  switch (action.type) {
    case constants.DRAW_EVENT:
      return {
        ...state,
        drawData: state.drawData.concat(action.payload),
      };
    case constants.TOGGLE_MOUSEDOWN:
      return {
        ...state,
        mouseDown: action.payload,
      };
    default:
      return state;
  }
};

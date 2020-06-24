import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import drawReducer from '../reducers/drawReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    draw: drawReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

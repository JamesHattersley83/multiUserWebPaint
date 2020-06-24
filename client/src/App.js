import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Canvas from './components/Canvas';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Canvas />
        </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
          <Router>
            <div className="App">
              <Home />
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;

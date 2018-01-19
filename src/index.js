import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path='/' component={App}/>
    </Provider>
  </Router>,
document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import reducers from './reducers/index.js';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';

const store=createStore (reducers, applyMiddleware(thunk));



ReactDOM.render((<Provider store={store}>
  <App />
</Provider>),document.getElementById('root'));



/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

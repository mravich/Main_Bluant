import 'babel-polyfill';
// BASIC REACT DEPENDENCIES
import React from 'react';
import ReactDOM from "react-dom";

// REDUX DEPENDENCIES
import {Provider} from 'react-redux';
import {createStore} from 'redux'; // CREATING STORE BY ONLY IMPORTING CRTEATESTORE FUNCTION FROM redux

import allReducers from './reducers';

// COMPONENT TO DISPLAY ON WEBPAGE
import App from './components/App';

// SINCE IT WILL BE MADE ONLY ONCE WE MAKE IT CONSTANT (MAIN DATA STORAGE)
const store = createStore(allReducers);


// PROVIDER BECOMES NEW ROOT COMPONENT and we need to define a store for provider to use.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));

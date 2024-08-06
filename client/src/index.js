import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore , combineReducers} from 'redux'; // Import createStore and combineReducers from Redux
import { rootReducers } from './redux/rootReducers';

// Combine your reducers
const finalReducer = combineReducers({
  rootReducer: rootReducers
});

// Define initial state
const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  }
};

// Create store using createStore
const store = createStore(finalReducer, initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the store to the Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/main.scss';
import ContextProviders from './contexts';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ContextProviders>
    <App />
  </ContextProviders>,
  document.getElementById('root'),
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const rootEl = document.querySelector('#green-recos-root');

export default () => ReactDOM.hydrate(<App />, rootEl);
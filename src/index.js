import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './media.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MotionGlobalConfig} from 'framer-motion';

// Visual regression tests (tests/visual) make every animation finish instantly.
if (window.__VISUAL_TEST__) {
    MotionGlobalConfig.skipAnimations = true;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

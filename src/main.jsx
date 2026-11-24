import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionGlobalConfig} from 'motion/react';
import './styles/fonts.css';
import './styles/base.css';
import App from './App';

// Visual regression tests (tests/visual) make every animation finish instantly.
if (window.__VISUAL_TEST__) {
    MotionGlobalConfig.skipAnimations = true;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>
);

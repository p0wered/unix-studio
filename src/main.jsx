import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {MotionGlobalConfig} from 'motion/react';
import './styles/fonts.css';
import './styles/base.css';
import App from './App';

// Visual regression tests (tests/visual) make every animation finish instantly.
if (window.__VISUAL_TEST__) {
    MotionGlobalConfig.skipAnimations = true;
}

const root = document.getElementById('root');
const app = (
    <StrictMode>
        <App/>
    </StrictMode>
);

// Built pages come prerendered (scripts/prerender.js): attach to that HTML. The dev server serves an empty root.
if (root.hasChildNodes()) {
    hydrateRoot(root, app);
} else {
    createRoot(root).render(app);
}

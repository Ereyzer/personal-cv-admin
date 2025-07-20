import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'modern-normalize';
import './index.css';

import App from './components/App';
import ContextProviders from './components/context/ContextProviders';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProviders>
  </StrictMode>
);

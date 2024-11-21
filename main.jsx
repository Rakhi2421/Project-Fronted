import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Change from .tsx to .jsx if App is a JSX file
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

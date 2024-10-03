// main.jsx
// main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import './index.css'; // Import global styles

// Get the root element from the HTML
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




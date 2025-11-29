import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from "./components/ToastProvider";

import App from './app';
import '../styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
       <ToastProvider>
          <App />
        </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);

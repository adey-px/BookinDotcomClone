import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

import { AuthsContextProvider } from "./contextApi/AuthsContext";
import { SearchContextProvider } from "./contextApi/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthsContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthsContextProvider>
  </React.StrictMode>
);
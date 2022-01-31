import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SportsProvider from './context'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-dsqy7a4y.eu.auth0.com"
      clientId="1t7GqXbkl38ZFDIypumccDplb9kSb8yj"
      redirectUri={window.location.origin}
    >
      <SportsProvider>
        <App />

      </SportsProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



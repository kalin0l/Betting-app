import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SportsProvider } from "./context/context";
import { AuthProvider } from "./context/authContext";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <SportsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SportsProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

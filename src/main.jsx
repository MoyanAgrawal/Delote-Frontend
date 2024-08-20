import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-lsltjqnz3lu5n254.us.auth0.com"
    clientId="3aLOoUj7qyTYDutthE1r19EYCkeU3MuT"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    audience="this is a unique identifier"
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
);

import { Provider } from "/src/components/ui/provider.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // import context


const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Provider>
            <App />
          </Provider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}

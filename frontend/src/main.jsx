import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TokenProvider } from "./store/Token.store.jsx";
import { DataProvider } from "./store/login.user.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </TokenProvider>
  </StrictMode>
);

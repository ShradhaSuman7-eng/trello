import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BoardProvider } from "./context/BoardProvider.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BoardProvider>
      <App />
    </BoardProvider>
  </BrowserRouter>
);

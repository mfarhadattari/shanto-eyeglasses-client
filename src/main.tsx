import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainProvider from "./providers/MainProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainProvider />
  </React.StrictMode>
);

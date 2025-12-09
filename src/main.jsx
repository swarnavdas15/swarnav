import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

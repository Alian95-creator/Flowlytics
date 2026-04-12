import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// 🔥 filter error TradingView biar console bersih
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.("TradingView")) return;
  originalError(...args);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* 🔥 GLOBAL TOAST */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #222",
          },
        }}
      />

      <App />

    </BrowserRouter>
  </React.StrictMode>
);
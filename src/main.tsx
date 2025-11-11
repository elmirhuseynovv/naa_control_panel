import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();
const styleTitle = [
  "font-size: 24px",
  "color: #1447E6",
  "font-weight: bold",
  "text-shadow: 0 0 10px #1447E6",
  "padding: 10px 0",
].join(";");

const styleBrand = [
  "font-size: 14px",
  "color: #888",
  "font-style: italic",
  "padding: 10px 0",
].join(";");

console.log("%c🛫 Welcome to the NAA Control Panel Console 🛫", styleTitle);
console.log("%c🔗 https://elmir-dev.vercel.app", styleBrand);
console.log("%c✈️ Have a smooth flight!", "color: #1447E6; font-weight:bold; font-size: 12px;");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

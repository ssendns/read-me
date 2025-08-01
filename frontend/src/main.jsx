import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterWrapper from "./RouterWrapper";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterWrapper />
  </StrictMode>
);

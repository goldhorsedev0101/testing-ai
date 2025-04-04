import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Contact from "./Contact.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Contact />
  </StrictMode>
);

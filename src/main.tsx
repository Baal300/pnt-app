import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TranslationProvider } from "./providers/TranslationProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </ThemeProvider>
  </StrictMode>,
);

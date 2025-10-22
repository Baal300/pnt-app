import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext, type Theme } from "../contexts/ThemeContext";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, fallback to system preference
    const saved = localStorage.getItem("app-theme") as Theme;
    if (saved && ["light", "dark", "system"].includes(saved)) {
      return saved;
    }
    return "system";
  });

  // Listen for system theme changes
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";
        setTheme(newColorScheme);
      });
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light", "dark");

    // Add current theme class
    root.classList.add(theme);

    // Store in localStorage
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

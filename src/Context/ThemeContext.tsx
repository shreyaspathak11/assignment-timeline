// ThemeContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: () => void;
  setLightMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
    setIsDarkMode(true);
    localStorage.setItem('theme', 'dark');
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
    setIsDarkMode(false);
    localStorage.setItem('theme', 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setDarkMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

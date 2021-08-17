import { useState } from 'react';

export const useThemeMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', selectedTheme);
    setTheme(selectedTheme);
  };
  return [
    theme,
    toggleTheme
  ];
};

import { useState } from 'react';

export const useThemeMode = (): [string, () => void] => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
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

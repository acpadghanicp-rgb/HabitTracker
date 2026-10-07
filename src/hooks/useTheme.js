/**
 * useTheme.js
 * Theme management hook supporting light & dark modes with persistent storage
 * and dynamic class / attribute application on the document root element.
 */
import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('app_theme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

export default useTheme;

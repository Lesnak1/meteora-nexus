'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const updateTheme = () => {
      let newTheme: 'light' | 'dark' = 'light';
      
      if (theme === 'system') {
        newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newTheme = theme;
      }

      setCurrentTheme(newTheme);
      
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.style.setProperty('--background', '#0f0f0f');
        root.style.setProperty('--foreground', '#f0f0f0');
        root.style.setProperty('--primary', '#fb923c');
        root.style.setProperty('--secondary', '#f472b6');
        root.style.setProperty('--accent', '#a855f7');
        root.style.setProperty('--text-primary', '#f1f5f9');
        root.style.setProperty('--text-secondary', '#cbd5e1');
        root.style.setProperty('--card', 'rgba(15, 15, 15, 0.9)');
      } else {
        root.style.setProperty('--background', '#fefefe');
        root.style.setProperty('--foreground', '#1a1a1a');
        root.style.setProperty('--primary', '#f97316');
        root.style.setProperty('--secondary', '#ec4899');
        root.style.setProperty('--accent', '#8b5cf6');
        root.style.setProperty('--text-primary', '#1e293b');
        root.style.setProperty('--text-secondary', '#64748b');
        root.style.setProperty('--card', 'rgba(255, 255, 255, 0.9)');
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
    
    return undefined;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
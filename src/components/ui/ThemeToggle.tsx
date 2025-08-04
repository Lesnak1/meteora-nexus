'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './button';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'light' || (theme === 'system' && currentTheme === 'light')) {
      return <Sun className="w-4 h-4" />;
    } else if (theme === 'dark' || (theme === 'system' && currentTheme === 'dark')) {
      return <Moon className="w-4 h-4" />;
    } else {
      return <Monitor className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    if (theme === 'light') return 'Light';
    if (theme === 'dark') return 'Dark';
    return 'System';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </Button>
  );
}
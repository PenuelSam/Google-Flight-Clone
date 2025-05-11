import { createContext, useContext, useEffect, useState } from "react";

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark' ;
    setTheme: (theme: Theme) => void;
}


const ThemeContext = createContext<ThemeContextType>({
    theme: 'light' as Theme,
    resolvedTheme: 'light',
    setTheme: () => {},
})

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if(typeof window !== 'undefined'){
          return (localStorage.getItem('theme') as Theme) || 'system';
        }
        return 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (mode: 'light' | 'dark') => {
            if (mode === 'dark') {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
            setResolvedTheme(mode);
          };

          const updateSystemTheme = () => {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(isDark ? 'dark' : 'light');
          };

          if (theme === 'system') {
            updateSystemTheme();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateSystemTheme);
          } else {
            applyTheme(theme);
          }

          localStorage.setItem('theme', theme);

          return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateSystemTheme);
          };
    },[theme])

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useContext, useState, useEffect } from 'react';

export type SolarTheme = 'solar-gold' | 'cyber-emerald' | 'deep-ocean' | 'modern-light';

interface ThemeContextType {
  theme: SolarTheme;
  setTheme: (theme: SolarTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'solar-gold',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<SolarTheme>(() => {
    const saved = localStorage.getItem('solar_theme') as SolarTheme;
    if (saved && ['solar-gold', 'cyber-emerald', 'deep-ocean', 'modern-light'].includes(saved)) {
      return saved;
    }
    return 'solar-gold';
  });

  const setTheme = (newTheme: SolarTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('solar_theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    if (theme === 'modern-light') {
      root.classList.add('light-mode');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      root.classList.remove('light-mode');
      document.body.style.color = '#ffffff';
      if (theme === 'cyber-emerald') {
        document.body.style.backgroundColor = '#09090b';
      } else if (theme === 'deep-ocean') {
        document.body.style.backgroundColor = '#0b1329';
      } else {
        document.body.style.backgroundColor = '#020617';
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import React, { createContext, useContext, useState, useEffect } from 'react';

export type SolarThemeClass = 'theme-solar-gold' | 'theme-cyber-emerald' | 'theme-deep-ocean' | 'theme-modern-light';

interface ThemeContextType {
  themeClass: SolarThemeClass;
  setThemeClass: (theme: SolarThemeClass) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeClass: 'theme-solar-gold',
  setThemeClass: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeClass, setThemeClassState] = useState<SolarThemeClass>(() => {
    const saved = localStorage.getItem('app-theme') as SolarThemeClass;
    if (saved && ['theme-solar-gold', 'theme-cyber-emerald', 'theme-deep-ocean', 'theme-modern-light'].includes(saved)) {
      return saved;
    }
    return 'theme-solar-gold';
  });

  const setThemeClass = (newTheme: SolarThemeClass) => {
    setThemeClassState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  useEffect(() => {
    // Apply class directly to html (document.documentElement)
    document.documentElement.className = themeClass;
  }, [themeClass]);

  return (
    <ThemeContext.Provider value={{ themeClass, setThemeClass }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

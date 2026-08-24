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
    // Inject data-theme directly on documentElement
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

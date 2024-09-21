import React, { createContext, useContext, useState } from 'react';
import { ThemeContextType, ThemeProviderProps } from '../types/interfaces';
import { Theme } from '../types/types';


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const toggleTheme = () => {
        setTheme(((prevThem: string) => (prevThem === "light" ? "dark" : "light")));
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
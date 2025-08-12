import React, { createContext, useContext, useState, ReactNode} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

// Definindo temas claros e escuros
const lightTheme = {
    colors: {
        background: '#C1C1C1', // cinza claro
        text: '#383838', // cinza escuro
        primary: '#E49B60', // laranja
    },
    spacing: (value: number) => value * 8, // espaçamento baseado em múltiplos de 8
};
const darkTheme = {
    colors: {
        background: '#4F4F4F', // cinza escuro
        text: '#CBCBCB', // cinza muito claro
        primary: '#D36912', // laranja escuro
    },
    spacing: (value: number) => value * 8,
};

// Criando o contexto do tema
type Theme = typeof lightTheme;
interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}
// Inicializando o contexto com tema claro como padrão
const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    toggleTheme: () => {},
});
// Hook personalizado para usar o contexto do tema
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [mode, setMode] = useState<ColorSchemeName>(colorScheme || 'light');

  // Função para alternar entre temas claro e escuro usando o estado
  const toggleTheme = () => {
      setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
      </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
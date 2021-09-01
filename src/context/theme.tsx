import { createContext, useState } from "react";

export type ThemeProps = {
  title: string;
  setTitle: Function;
};

export const ThemeContext = createContext<ThemeProps>({} as ThemeProps);

export const ThemeStyleProvider: React.FC = ({ children }) => {
  const [title, setTitle] = useState("coke");

  return (
    <ThemeContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

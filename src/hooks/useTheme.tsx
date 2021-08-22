import { useContext } from "react";
import ThemeContext, { ThemeProps } from "../context/theme";

export const useTheme = (): ThemeProps => {
	const context = useContext(ThemeContext);

	if(!context) {
		throw new Error('useTheme must be inside an AuthProvider')
	}

	return context;
}

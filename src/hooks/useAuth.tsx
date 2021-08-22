import AuthContext, { AuthProps } from "../context/auth";
import { useContext } from "react";

export const useAuth = (): AuthProps => {
	const context = useContext(AuthContext);

	if(!context) {
		throw new Error('useAuth must be inside an AuthProvider')
	}

	return context;
}

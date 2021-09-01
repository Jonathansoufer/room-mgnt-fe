import { createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { USER } from "../utils/constants";
import { useTheme } from "../hooks/useTheme";

interface UserProps {
  id: string;
  name: string;
  email: string;
  company: string;
}

interface loginProps {
  token: string;
  user: UserProps;
}

export type AuthProps = {
  signIn: (data: CredentialsProps) => void;
  signOut: () => void;
  profile: loginProps | null;
};

interface CredentialsProps {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [handleLogin] = useMutation(LOGIN);
  const [profile, setProfile] = useState<loginProps | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER);

    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (credentials: CredentialsProps) => {
    try {
      const { data } = await handleLogin({ variables: { input: credentials } });
      setProfile(data.login);

      localStorage.setItem(USER, JSON.stringify(data.login));
    } catch (err) {
      toast.error(`${err.message} 😕`);
    }
  };

  const signOut = () => {
    localStorage.removeItem(USER);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

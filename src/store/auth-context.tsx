import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

interface authProvideProps {
  children: any;
}

function AuthContextProvider({ children }: authProvideProps) {
  const [authToken, setAuthToken] = useState<string>("");

  function authenticate(token: string) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken("");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

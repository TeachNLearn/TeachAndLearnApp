import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from "react";
import { AppAsyncStorage } from '../utils/globalContants';

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
    AsyncStorage.setItem(AppAsyncStorage, token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem(AppAsyncStorage);
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

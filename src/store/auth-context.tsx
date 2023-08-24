import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';
import {AppAsyncStorage} from '../utils/globalContants';

const initialUser = {
  _id: '',
  name: '',
  userName: '',
  photo: '',
  tagline: '',
  email: '',
  enrolledProgramme: '',
  role: '',
  phoneNumber: '',
  classesEnrolled: [] as string[],
  classesTaken: [] as string[],
  interestedSubjects: [] as string[],
  strongSubjects: [] as string[],
  preferredLanguages: [] as string[],
};


interface userProps {
  _id: string;
  name: string;
  userName: string;
  photo: string;
  tagline: string;
  email: string;
  enrolledProgramme: string;
  role: string;
  phoneNumber: string;
  classesEnrolled: Array<any>
  classesTaken: string[];
  interestedSubjects: string[];
  strongSubjects: string[];
  preferredLanguages: string[];
}


export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token: string, user: userProps) => {},
  logout: () => {},
  user: initialUser,
});

interface authProvideProps {
  children: any;
}

function AuthContextProvider({children}: authProvideProps) {
  const [authToken, setAuthToken] = useState<string>('');
  const [userData, setUserData] = useState<userProps>(initialUser);

  function authenticate(token: string, user: userProps) {
    setAuthToken(token);
    setUserData(user);
    AsyncStorage.setItem(AppAsyncStorage, token);
  }

  function logout() {
    setAuthToken('');
    AsyncStorage.removeItem(AppAsyncStorage);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    user: userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

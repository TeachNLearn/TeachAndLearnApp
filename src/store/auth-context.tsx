import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';
import {AppAsyncUserStorage} from '../utils/globalContants';

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
  token: '',
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
  classesEnrolled: Array<any>;
  classesTaken: string[];
  interestedSubjects: string[];
  strongSubjects: string[];
  preferredLanguages: string[];
  token: string;
}

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  // authenticate: (token: string) => {},
  setLocalUser: (user: userProps) => {},
  logout: () => {},
  user: initialUser,
});


interface authProvideProps {
  children: any;
}

function AuthContextProvider({children}: authProvideProps) {
  const [authToken, setAuthToken] = useState<string>('');
  const [userData, setUserData] = useState<userProps>(initialUser);


  function localUser(user: userProps) {
    setUserData(user);
    AsyncStorage.setItem(AppAsyncUserStorage, JSON.stringify(user));
    setAuthToken(user.token);
  }

  function logout() {
    setAuthToken('');
    AsyncStorage.removeItem(AppAsyncUserStorage);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    setLocalUser: localUser,
    logout: logout,
    user: userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

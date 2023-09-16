import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import InputHolder from '../../components/inputComponents/inputHolder';
// import Button from "../components/general-comp/button";
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import axios from 'axios';
import {isValidEmail} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import Button from '../../components/general-components/button';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DescriptionBox from '../../components/authComponents/descriptionBox';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

interface loginDataProps {
  email: string;
  password: string;
}

const Login = ({navigation}: any) => {
  const [loginData, setLoginData] = useState<loginDataProps>({
    email: '',
    password: '',
  });

  const [errorText, setErrorText] = useState('');

  const authCtx = useContext(AuthContext);

  function updateFields(fields: Partial<loginDataProps>) {
    setLoginData(prev => {
      return {...prev, ...fields};
    });
  }

  type RootStackParamList = {
    Signup: undefined;
  };

  type BottomTabParamList = {
    Home: undefined;
  };

  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const bottomNavigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const handleValidation = () => {
    const {email, password} = loginData;
    if (email === '' || password === '') {
      setErrorText('Please fill in all fields.');
      return false;
    } else if (!isValidEmail(email)) {
      setErrorText('Please enter a valid email.');
      return false;
    } else if (password.length < 6) {
      setErrorText('Password must be at least 6 characters long.');
      return false;
    }
    setErrorText('');
    return true;
  };

  const loginHandler = async () => {
    console.log(loginData);
    if (handleValidation()) {
      await axios
        .post(`${BASE_URL}${apiVersion}/auth/login`, {
          email: loginData.email,
          password: loginData.password,
        })
        .then(({data}) => {
          let user = data.data.user;
          console.log(data.token);
          user.token = data.token;
          authCtx.setLocalUser(user);
          // navigation.navigate('Home');
        })
        .catch(data => {
          console.log(data);
        });
    }
  };
  const loginNavigation = () => {
    navigation.navigate('Signup');
  };

  return (
    <ScrollView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <DescriptionBox
          heading="Welcome"
          subHeading="Back"
          text="Log in to your account"
        />
        <View style={styles.formContainer}>
          <InputHolder
            label="Email"
            name="email"
            type="string"
            value={loginData.email}
            placeholderText="Enter Email"
            updateFields={updateFields}
            hasDropdown={false}
            showLabel={true}
          />
          <InputHolder
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            updateFields={updateFields}
            placeholderText="Enter Password"
            hasDropdown={false}
            showLabel={true}
          />
          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
          <Button containerStyles={styles.loginButton} onPress={loginHandler}>
            Login
          </Button>
        </View>
        <View style={styles.signup}>
          <Text style={styles.simpleText}>Already have an account?</Text>
          <TouchableOpacity onPress={loginNavigation}>
            <Text style={styles.link}>Signup!!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },
  formContainer: {
    width: '90%',
    marginTop: 24,
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 36,
  },
  button: {
    borderRadius: 8,
  },
  signup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 4,
    marginTop: 12,
  },
  simpleText: {
    color: '#666666',
  },
  link: {
    color: '#094067',
    fontWeight: '700',
    fontFamily: "Nunito",
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#094067',
  },
});

export default Login;

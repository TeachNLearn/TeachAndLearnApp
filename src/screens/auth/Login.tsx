import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputHolder from '../../components/input/inputHolder';
// import Button from "../components/general-comp/button";
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import axios from 'axios';
import {isValidEmail} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import Button from '../../components/general-components/button';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DescriptionBox from '../../components/auth-components/descriptionBox';

interface loginDataProps {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<loginDataProps>({
    email: '',
    password: '',
  });

  const authCtx = useContext(AuthContext);

  function updateFields(fields: Partial<loginDataProps>) {
    setLoginData(prev => {
      return {...prev, ...fields};
    });
  }

  const handleValidation = () => {
    const {email, password} = loginData;
    if (email === '' || password === '') {
      return false;
    } else if (!isValidEmail(email)) {
      return false;
    } else if (password.length < 6) {
      return false;
    }
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
          const user = data.data.user;
          console.log(data.token);
          authCtx.authenticate(data.token);
        })
        .catch(data => {
          console.log(data);
        });
    }
  };

  type RootStackParamList = {
    Signup: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loginNavigation = () => {
    navigation.navigate('Signup');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DescriptionBox />
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
          <Button onPress={loginHandler}>Login</Button>
        </View>
        <View style={styles.signup}>
          <Text style={styles.simpleText}>Already have an account?</Text>
          <Text onPress={loginNavigation} style={styles.link}>
            Signup!!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
    paddingBottom: 50,
    backgroundColor: 'white',
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
  },
});

export default Login;

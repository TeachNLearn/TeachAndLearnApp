import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useMultiStepForm} from '../../utils/useMultiStepForm';
import SignupForm from '../../components/auth-components/SignupForm';
import DescriptionBox from '../../components/auth-components/descriptionBox';
import {StyleSheet} from 'react-native';
import UserInfoForm from '../../components/auth-components/UserInfoForm';
import Button from '../../components/general-components/button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface USERDATA {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
  number: string;
  course: string;
  standard: string;
  interestedSubject: string;
  interestedSubjects: string[];
  strongSubject: string;
  strongSubjects: string[];
  language: string;
  preferredLanguages: string[];
}

const initialData: USERDATA = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  photo: '',
  number: '',
  course: '',
  standard: '',
  interestedSubject: '',
  interestedSubjects: [],
  strongSubject: '',
  strongSubjects: [],
  preferredLanguages: [],
  language: '',
};

const Signup = () => {
  const [userData, setUserData] = useState<USERDATA>(initialData);

  function updateFields(fields: Partial<USERDATA>) {
    setUserData(prev => {
      return {...prev, ...fields};
    });
  }

  const {step, isFirstStep, isLastStep, next, back, currentStepIndex} =
    useMultiStepForm([
      <SignupForm {...userData} updateFields={updateFields} />,
      <UserInfoForm {...userData} updateFields={updateFields} />,
    ]);

  const onSubmit = () => {
    console.log('CHECKING');

    if (!isLastStep) return next();
    else console.log(userData);
  };

  type RootStackParamList = {
    Login: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loginNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DescriptionBox />
        <View style={styles.formWrapper}>
          {step}
          <Button onPress={onSubmit}>{isLastStep ? 'Signup' : 'Next'}</Button>
          {isLastStep && <Button onPress={back}>Back</Button>}
        </View>
        <View>
          <Text>Already have an account?</Text>
          <View>
            <Text onPress={loginNavigation} style={styles.link}>
              Login!
            </Text>
          </View>
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
    rowGap: 40,
    paddingBottom: 50,
  },
  formWrapper: {
    // flex: 1,
    width: '90%',
    marginHorizontal: 'auto',
  },
  link: {
    color: '#094067',
  },
});

export default Signup;

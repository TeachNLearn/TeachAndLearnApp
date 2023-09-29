import React, {useState, useEffect, useContext,useRef} from 'react';
import {ScrollView, Text, View, KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import {useMultiStepForm} from '../../utils/useMultiStepForm';
import SignupForm from '../../components/authComponents/SignupForm';
import DescriptionBox from '../../components/authComponents/descriptionBox';
import {StyleSheet} from 'react-native';
import UserInfoForm from '../../components/authComponents/UserInfoForm';
import Button from '../../components/general-components/button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {AuthContext} from '../../store/auth-context';
import { COLORS_ELEMENTS } from '../../utils/globalContants';
import { ToastHOC } from '../../helpers/Toast';


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
  
  const scrollViewRef:any = useRef(null);

  function updateFields(fields: Partial<USERDATA>) {
    setUserData(prev => {
      return {...prev, ...fields};
    });
  }

  const authCtx = useContext(AuthContext);

  const {step, isLastStep, next, back} = useMultiStepForm([
    <SignupForm {...userData} updateFields={updateFields} />,
    <UserInfoForm {...userData} updateFields={updateFields} />,
  ]);

  type RootStackParamList = {
    Login: undefined;
    Home: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: any) => {
    console.log('CHECKING');
    if (!isLastStep) return next();
    else {
      e.preventDefault();
      setIsLoading(true);
      await axios
        .post(`${BASE_URL}${apiVersion}/auth/signup`, {
          name: userData.fullName,
          userName: userData.userName,
          email: userData.email,
          password: userData.password,
          passwordConfirm: userData.confirmPassword,
          photo: userData.photo,
          phoneNumber: userData.number,
          enrolledProgramme: userData.course,
          standard: userData.standard,
          interestedSubjects: userData.interestedSubjects,
          strongSubjects: userData.strongSubjects,
          preferredLanguages: userData.preferredLanguages,
        })
        .then(({data}) => {
          console.log(data.token);
          console.log(data);
          const user = data.data.user;
          user.token = data.token;
          authCtx.setLocalUser(user);
          setIsLoading(false);
          ToastHOC.successAlert('SignUp Success',`If not please sign in`)
          navigation.navigate('Home');
        })
        .catch(data => {
          const error = data.response.data.message;
          console.log(error);
          ToastHOC.errorAlert('Error Occured',error)
          setIsLoading(false);
        });
    }
  };

  const loginNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    // <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}>
    <ScrollView>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <DescriptionBox
          heading="Get"
          subHeading="Started"
          text="Register for an account"
        />
        <View style={styles.formWrapper}>
          <View>{step}</View>
          <View style={styles.buttonWrapper}>
            <Button containerStyles={styles.btn} onPress={onSubmit}>
              {isLastStep ? (isLoading ? <ActivityIndicator size={'small'} color={COLORS_ELEMENTS.buttonTxt}/>:'Sign Up') : 'Next'}
            </Button>
            {isLastStep && (
              <Button containerStyles={styles.btn} onPress={back}>
                Back
              </Button>
            )}
          </View>
        </View>
        <View style={styles.login}>
          <Text style={styles.simpleText}>Already have an account?</Text>
          <Text onPress={loginNavigation} style={styles.link}>
            Login!!
          </Text>
        </View>
      </KeyboardAvoidingView>
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
  formWrapper: {
    width: '90%',
    marginTop: 24,
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 36,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
  },
  login: {
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
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#094067',
  },
});

export default Signup;

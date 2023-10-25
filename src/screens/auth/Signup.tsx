import React, {useState, useEffect, useContext,useRef} from 'react';
import {ScrollView, Text, View, KeyboardAvoidingView,ActivityIndicator, Keyboard, ToastAndroid} from 'react-native';
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
import { COLORS_ELEMENTS, emailValidation } from '../../utils/globalContants';
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
  otp:any;
}

const initialData: USERDATA = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHZh0aF5Og2DF4G19yPVx_QGjXfaBByFZA&usqp=CAU',
  number: '',
  course: '',
  standard: '',
  interestedSubject: '',
  interestedSubjects: [],
  strongSubject: '',
  strongSubjects: [],
  preferredLanguages: [],
  language: '',
  otp:0,
};

const Signup = () => {
  const [userData, setUserData] = useState<USERDATA>(initialData);


  const [errorText, setErrorText] = React.useState<any>({});

  const updateError = (errorMessage: string | null, input: string) => {
    setErrorText((prevState: any) => ({ ...prevState, [input]: errorMessage }));
  };

// const isValidObjectField = (obj: any) => {
//     return Object.values(obj).every((value: any) => value.trim());
// };

const isValid1StepForm = () => {
  Keyboard.dismiss();
  // if (!isValidObjectField(userData)) { return updateError('Fill all the fields', 'All'); }

  if (!userData.fullName.trim() || userData.fullName.length < 4) { return updateError('name should be more than 4 characters', 'fullName') }
  if (!userData.userName.trim() || userData.userName.length < 4) { return updateError('name should be more than 3 characters', 'userName') }
  if (!emailValidation.test(userData.email)) { return updateError('write email in correct format', 'email'); }
  if (userData.otp.length  === 5) { return updateError('OTP should be of 6 digits', 'otp') }
  if (!userData.password.trim() || userData.password.length < 6) { return updateError('password should be in proper manner', 'password') }
  if (!userData.confirmPassword.trim() || userData.confirmPassword.length < 6) { return updateError('write password in proper manner', 'confirmPassword') }
  return true;
};


const isValid2StepForm = () => {
  Keyboard.dismiss();
  // if (!isValidObjectField(userData)) { return updateError('Fill all the fields', 'All'); }

  if (!userData.number.trim() || userData.number.length < 10) { return updateError('number should be upto 10 digits', 'number') }
  if (!userData.course.trim() || userData.course.length < 4) { return updateError('course should be more 4 characters', 'course') }
  if (!userData.standard.trim() || userData.standard.length < 4) { return updateError('standard should be more than 4 characters', 'standard') }
  if (!userData.interestedSubjects.length > 0 ) { return updateError('please seleact atleast 1 interested subject', 'interestedSubjects') }
  if (!userData.strongSubjects.length > 0 ) { return updateError('please seleact atleast 1 strong subject', 'strongSubjects') }
  if (!userData.preferredLanguages.length > 0 ) { return updateError('please seleact atleast 1 preferredLanguages', 'preferredLanguages') }


  return true;
};



  
  const scrollViewRef:any = useRef(null);

  function updateFields(fields: Partial<USERDATA>) {
    setUserData(prev => {
      return {...prev, ...fields};
    });
  }

  const authCtx = useContext(AuthContext);

  const {step, isLastStep, next, back} = useMultiStepForm([
    <SignupForm errorText={errorText} updateError={updateError} {...userData} updateFields={updateFields} />,
    <UserInfoForm errorText={errorText} updateError={updateError}  {...userData} updateFields={updateFields} />,
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
    {isLastStep ? (isLoading ? <ActivityIndicator size={'small'} color={COLORS_ELEMENTS.buttonTxt}/>:'Sign Up') : 'Next'}

    if(isLastStep ? isValid2StepForm():isValid1StepForm()){
      if (!isLastStep) return next();
      else {
        e.preventDefault();
        setIsLoading(true);
        await axios
          .put(`${BASE_URL}${apiVersion}/auth/signup`, {
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
            const user = data.data.user;
            user.token = data.token;
            authCtx.setLocalUser(user);
            setIsLoading(false);
            ToastHOC.successAlert('SignUp Success',`success`)
            navigation.navigate('Home');
          })
          .catch(data => {
            const error = data.response.data.message;
            ToastHOC.errorAlert('Error Occured',error)
            setIsLoading(false);
          });
      }
    }else{
      ToastAndroid.show('fill all fields',200)
    }
   
  };

  const loginNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    // <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}>
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
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
    fontWeight: '700',
    fontFamily: 'Nunito',
    textDecorationLine: 'underline',
  },
  btn: {
    backgroundColor: '#094067',
    marginTop:10
  },
});

export default Signup;

import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InputHolder from '../inputComponents/inputHolder';
import {COLORS_ILLUSTRATION, FONT_FAMILY} from '../../utils/globalContants';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../utils/apiRoutes';
import { ToastHOC } from '../../helpers/Toast';


interface SignUpData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorText:any,
  updateError:any,
  otp:any
}

type SignupFormProps = SignUpData & {
  updateFields: (fields: Partial<SignUpData>) => void;
};

const SignupForm = (props: SignupFormProps) => {
  const [openOtp, setOpenOtp] = React.useState(false);
  const [OTP, setOTP] = React.useState<any>();
  const [minutes, setMinutes] = React.useState<Number | any>(1);
  const [seconds, setSeconds] = React.useState<Number | any>(59);
  const [changeText, setChangeText] = React.useState('Submit')


  
 


  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const sendOtp = async () => {
    try {
      const sentOtp:any = await axios.put(`${BASE_URL}${apiVersion}/email/sendOtp`,{
        email:props?.email
      })
      if(sentOtp.data.status === 1){
        ToastHOC.successAlert('OTP delivered','success')
        setOpenOtp(true)
      }
      else if(sentOtp.data.status === 2){
        // console.log(sendOtp)
        ToastHOC.successAlert(sentOtp.data.message,'success')
      }
      else{
        ToastHOC.errorAlert('Error occured','error')
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const verifyOtp = async () => {
    // console.log(props.otp)
    try {
      const verifyOtp = await axios.put(`${BASE_URL}${apiVersion}/email/verify`,{
        email:props?.email,
        // otp:OTP
        otp:props.otp
      })
      console.log("VOO",verifyOtp.data)
      if(verifyOtp.data.status === 1){
        // setOpenOtp(!)
        setChangeText('Verified')
        ToastHOC.successAlert(verifyOtp.data.message,'success')
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const resendOtp = () => {
    setMinutes(1);
    setSeconds(30);
  };

  const {errorText} = props
  return (
    <View style={styles.formContainer}>
      <InputHolder
        type="text"
        label="Full Name"
        value={props.fullName}
        name="fullName"
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Full Name"
        showLabel={true}
        errorText={errorText.fullName}
        onFocus={() => {
          props.updateError(null, 'fullName');
      }}
      />
      <InputHolder
        type="text"
        label="Username (publicly visible)"
        value={props.userName}
        name="userName"
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Username (publicly visible)"
        showLabel={true}
        errorText={errorText.userName}
        onFocus={() => {
          props.updateError(null, 'userName');
      }}

      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '75%'}}>
          <InputHolder
            type="email"
            label="Email"
            name="email"
            value={props.email}
            updateFields={props.updateFields}
            // isRequired={true}
            placeholderText="Email"
            showLabel={true}
            errorText={errorText.email}
            onFocus={() => {
              props.updateError(null, 'email');
          }}
          />
          {!openOtp ?<Text style={{fontSize:11,color:'grey',marginLeft:10}}>note: please verify email before signup</Text>:null}
        </View>

        <View
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 2,

            flexDirection: 'column',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              borderRadius: 5,
              borderColor: openOtp === true ? '#dfe3e8' :COLORS_ILLUSTRATION.stroke,
              borderWidth: 1,
              paddingVertical:3,
            }}
            onPress={() => sendOtp()}
            disabled={openOtp === true ?true:false}
            >
            <Text
              style={{
                color: openOtp === true ? '#dfe3e8' :COLORS_ILLUSTRATION.stroke,
                fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              }}>
              Send otp
            </Text>
          </TouchableOpacity>
          {/* otp send text */}
          {
            openOtp?(
              <Text
            style={{
              fontSize: 11,
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              marginTop: 2,
            }}>
            OTP sent
          </Text>
            ):null
          }
        </View>
      </View>

      {/* OTP code */}
      {openOtp ? (
        <>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               <View style={{width:'75%'}}>
               <InputHolder
        type="text"
        label="OTP"
        value={props.otp}
        name="otp"
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Enter OTP"
        showLabel={true}
        errorText={errorText.otp}
        onFocus={() => {
          props.updateError(null, 'otp');
      }}
      />
               </View>
            
              <TouchableOpacity
                style={{
                  width: '20%',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: changeText === "Verified" ?'green':'#ff5630',
                  alignSelf: 'center',
                  padding: 2,
                }}
                onPress={()=>verifyOtp()}
                disabled={  changeText === "Verified" ?true:false}
                >
                <Text style={{color: changeText === "Verified" ?'green':'#ff5630'}}>{changeText}</Text>
              </TouchableOpacity>

            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}{' '}
              </Text>
              <TouchableOpacity
                disabled={seconds > 0 || minutes > 0}
                onPress={() => resendOtp()}>
                <Text
                  style={{
                    color: seconds > 0 || minutes > 0 ? '#dfe3e8' :'#ff5630' ,
                    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}

      <InputHolder
        type="password"
        label="Password"
        name="password"
        value={props.password}
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Password"
        showLabel={true}
        errorText={errorText.password}
        onFocus={() => {
          props.updateError(null, 'password');
      }}
      />
      <InputHolder
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        value={props.confirmPassword}
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Confirm Password"
        showLabel={true}
        errorText={errorText.confirmPassword}
        onFocus={() => {
          props.updateError(null, 'confirmPassword');
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 28,
  },
});

export default SignupForm;

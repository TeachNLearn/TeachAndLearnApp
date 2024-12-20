import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const IntroThree: React.FC = () => {
  type RootStackParamList = {
    IntroOne: undefined;
    IntroTwo: undefined;
    Signup: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={{flex:.4}}>
        <Image
          source={require('../../assets/Images/IntroImg3.png')}
          style={styles.introImg}
          resizeMode="contain"
        />
      </View>

        {/* text container */}

        <View style={[styles.textContainer,{flex:.4}]}>
            <Text style={styles.heading}>Byte size and topic</Text>
            <Text style={styles.headingpart}>focused classes</Text>
            <View style={styles.paraContainer}>
             <Text style={styles.para}>
             You don’t have to enroll into full length courses which last for
             months and cost you a fortune. You can choose how much help you need
             and how much time you want to dedicate to external help.
             </Text>
            </View>
       </View>


          {/* slider logo container */}
          <View style={styles.sliderLogoContainer}>
           <Text
            style={styles.sliderLogoOne}
            onPress={() => navigation.navigate('IntroOne')}></Text>
           <Text
            style={styles.sliderLogoTwo}
            onPress={() => navigation.navigate('IntroTwo')}></Text>
           <Text style={styles.sliderLogoThree}></Text>
          </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.heading}>Byte size and topic</Text>
        <Text style={styles.headingpart}>focused classes</Text>
        <View style={styles.paraContainer}>
          <Text style={styles.para}>
            You don’t have to enroll into full length courses which last for
            months and cost you a fortune. You can choose how much help you need
            and how much time you want to dedicate to external help.
          </Text>
        </View>
        <View style={styles.sliderLogoContainer}>
          <Text
            style={styles.sliderLogoOne}
            onPress={() => navigation.navigate('IntroOne')}></Text>
          <Text
            style={styles.sliderLogoTwo}
            onPress={() => navigation.navigate('IntroTwo')}></Text>
          <Text style={styles.sliderLogoThree}></Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnTwo}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.btntxtTwo}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      
      {/* button container */}
      <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnTwo}
            onPress={() => navigation.navigate('PreLogin')}>
            <Text style={styles.btntxtTwo}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#EFD9C9',
    flex:1,
  },
  introImg: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 118,
    borderBottomRightRadius: 118,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginTop: 30,
    padding: 5,
    fontFamily: 'Nunito',
  },
  headingpart: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
    fontFamily: 'Nunito',
  },
  paraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  para: {
    fontWeight: '400',
    fontSize: 15,
    color: '#565266',
    margin: 20,
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
  sliderLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 30,
    // marginBottom: 30,
    flex:.05,
  },
  sliderLogoOne: {
    height: 10,
    width: 30,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#707997',
  },
  sliderLogoTwo: {
    height: 10,
    width: 30,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#707997',
  },
  sliderLogoThree: {
    height: 10,
    margin: 5,
    width: 48,
    backgroundColor: '#08222E',
    borderRadius: 5,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:0.15,
  },
  btnTwo: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop:10,
    // width: 350,
    width:'90%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 15,
  },
  btntxtTwo: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
});

export default IntroThree;

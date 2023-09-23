import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import hjb from '../../assets/Images/IntroImg3.png';
import Carausal from '../../helpers/Carausal';

const IntroOne: React.FC = () => {
  type RootStackParamList = {
    IntroTwo: undefined;
    IntroThree: undefined;
    Signup: undefined;
    Hometab: undefined;
  };

  const images = [
    {
      image:require('../../assets/Images/IntroImg.png')
    },
    {
      image:require('../../assets/Images/IntroImg2.png')
    },
    {
      image:require('../../assets/Images/IntroImg3.png')
    }
  ]
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={require('../../assets/Images/IntroImg.png')}
            style={styles.introImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.heading}>Teach , Learn and Grow</Text>
        <Text style={styles.headingpart}>Together !</Text>
        <View style={styles.paraContainer}>
          <Text style={styles.para}>
            This app aims to bring the students from all across the world
            together and give them a platform where they can teach other
            students as well as learn from them to aid their academics.
          </Text>
        </View>
        <View style={styles.sliderLogoContainer}>
          <Text style={styles.sliderLogoOne}></Text>
          <Text
            style={styles.sliderLogoTwo}
            onPress={() => navigation.navigate('IntroTwo')}></Text>
          <Text
            style={styles.sliderLogoThree}
            onPress={() => navigation.navigate('IntroThree')}></Text>
        </View>

        <View style={styles.btnContainer}>
          <Text
            style={styles.btntxt}
            onPress={() => navigation.navigate('Signup')}>
            Skip
          </Text>
          <TouchableOpacity
            style={styles.btnTwo}
            onPress={() => navigation.navigate('IntroTwo')}>
            <Text style={styles.btntxtTwo}>Next</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
    // <>
    //   <Carausal
    //   data={images}
    //   />
    // </>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#D8CEFF',
    
  },
  introImg: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
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
    fontFamily: 'Nunito',
  },
  sliderLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  sliderLogoOne: {
    height: 10,
    width: 48,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#08222E',
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
    width: 30,
    backgroundColor: '#707997',
    borderRadius: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTwo: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: 100,
    marginLeft: 80,
    borderRadius: 15,
  },
  btntxtTwo: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
  btntxt: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 80,
    fontFamily: 'Nunito',
  },
});

export default IntroOne;

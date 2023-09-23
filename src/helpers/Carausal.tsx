import {StyleSheet, View, Image, Dimensions,Text,TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
// import { AI, AS, BC, BG, BW, DIMENSIONS, F, FD, H, JC, P, W } from '../styles/style'
// import {COLOR} from '../styles/color';
import Animated from 'react-native-reanimated';

interface ICARAUSAL {
  data: any;
  style: any;
  imageStyle: any;
  imageContainerWidth: any;
  imageContainerHeight: any;
  movingLinesWidthForIndex: any;
  dotsAlignment: any;
}
const {width,height} = Dimensions.get('window')


const Carausal = (props: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref = useRef(null);


  const rendeItems: any = ({item}) => {
    console.log("Item",item.image)
    return (
        <Animated.View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={item.image}
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
      </Animated.View>
    );
  };

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       if (currentIndex >= props?.data?.length - 1) {
//         ref?.current?.scrollToIndex({
//           animated: true,
//           index: 1,
//         });
//       } else {
//         ref?.current?.scrollToIndex({
//           animated: true,
//           index: parseInt(currentIndex) + 1,
//         });
//       }
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

  return (
    <View style={[]}>
      <Animated.FlatList
        data={props.data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={rendeItems}
        scrollsToTop={true}
        ref={ref}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex((x / props?.movingLinesWidthForIndex).toFixed(0));
          // setCurrentIndex((x/(DIMENSIONS.width - 40)).toFixed(0))
        }}
      />
      <Animated.View
      style={{flexDirection:'row',width:50,justifyContent:'center',alignItems:'center',position:'absolute',bottom:30}}>
        {props.data.images?.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                width: currentIndex == i ? 30 : 8,
                height: currentIndex == i ? 10 : 8,
                borderRadius: currentIndex == i ? 5 : 4,
                backgroundColor:
                  currentIndex == i ? COLOR.lightBlue : COLOR.grey,
                marginLeft: 5,
              }}></View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default Carausal;

const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: '#D8CEFF',
      padding:-20
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
  

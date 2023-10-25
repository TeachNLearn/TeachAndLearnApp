import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  withRepeat,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  withSpring,
  Extrapolate,
  BounceInRight,
} from 'react-native-reanimated';
import { COLORS_ILLUSTRATION } from '../../../utils/globalContants';

interface ISkeletonLoader{
  width:number,
  height:number,
}

const SkeletonLoaderHorizontalWithReanimatedGradient:React.FC<ISkeletonLoader>= ({
  width,
  height,
}) => {
  
  const translateX = useSharedValue(0);
  React.useEffect(() => {
    translateX.value = 0
    const interval = setInterval(() => { 
      translateX.value = 1    
      setTimeout(() => {
        translateX.value = 0
      }, 300);
    }, 1100); 

  return () => clearInterval(interval);
  },[]);

  const skeletonStyle = useAnimatedStyle(()=>{
    const opacity = withTiming(interpolate(
      translateX.value,[0,1],
      [0.3,.55],
      Extrapolate.CLAMP,
    ),{
      duration:350
    })

    
        return {
          opacity:opacity
    }
  })

  

  return (
    <View style={{height:height,width:width,marginTop:20,paddingHorizontal:20}}>
    <Animated.View
      style={[styles.backgroundGradient,skeletonStyle]}
      >
        {/* <Animated.View style={[{height:height,backgroundColor:'white'}]}>

        </Animated.View> */}
    </Animated.View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:60,
    borderWidth:1,
    width:100,
    padding:20

  },
  backgroundGradient: {
    flex: 1,
    // backgroundColor:'rgba(0,0,0,0.12)',
    backgroundColor:'white',
    // opacity:0.1,
    position:'relative'
  },
  movingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height:20,
    width:30,
    justifyContent: 'center', // Center the inner gradient vertically
  },
  innerGradient: {
    flex: 1,

  },
});

export default SkeletonLoaderHorizontalWithReanimatedGradient;

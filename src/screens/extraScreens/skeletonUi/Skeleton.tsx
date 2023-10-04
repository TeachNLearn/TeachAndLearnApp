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
} from 'react-native-reanimated';

const SkeletonLoaderHorizontalWithReanimatedGradient = ({
  width,
  height,
  borderRadius,
  duration,
}) => {
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 900, easing: Easing.linear })
      ),
      -1,
      false
    );
  }, []);

  const movingGradientStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(translateX.value, [0, 1], [-0, 60], Extrapolate.CLAMP) }],
    };
  });

  return (
    <View style={{height:height,width:width,marginTop:10,paddingHorizontal:20}}>
    <View
      // colors={['#FF5733', '#FFC300', '#FF5733']}
      style={styles.backgroundGradient}
      >
    {/* <Animated.View style={[styles.movingGradient, movingGradientStyle]}>
      <LinearGradient
      colors={['transparent', 'white', 'transparent']}
      style={styles.innerGradient}
      />
    </Animated.View> */}
    </View>
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
    backgroundColor:'rgba(0,0,0,0.12)',
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

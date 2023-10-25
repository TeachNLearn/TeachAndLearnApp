import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
// import { AI, AS, BC, BG, BW, DIMENSIONS, F, FD, H, JC, P, W } from '../styles/style'
// import {COLOR} from '../styles/color';
import Animated from 'react-native-reanimated';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../utils/globalContants';

interface ICARAUSAL {
  data: any;
  style: any;
  imageStyle: any;
  imageContainerWidth: any;
  imageContainerHeight: any;
  movingLinesWidthForIndex: any;
  dotsAlignment: any;
}

const CarausalForImage = (props: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref: any = useRef(null);

  const rendeItems: any = ({item}) => {
    return (
      <Animated.View
        style={{
          width: props?.imageContainerWidth,
          height: props?.imageContainerHeight,
        }}
        >
        {/* <View>
            <Image resizeMode='cover' style={props.imageStyle} source={item.image}/>
         </View> */}

        <View
          style={{
            // height: SCREEN_HEIGHT / 3,
            padding: 15,
            marginTop: 15,
            borderRadius: 5,
            backgroundColor: 'rgb(216, 238, 254)',
            flex: 1,
            marginLeft:10
          }}>
          <View style={{flex: 0.5}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.NUNITO_BOLD,
                fontSize: 18,
                flexWrap:'wrap',
                color: '#222',
                textAlign:'center'
              }}>
             {item.text}
            </Text>
          </View>
          <View style={{padding: 15, flex: 1}}>
            <Image
              source={item.image}
              style={{height: 120, width: 120, alignSelf: 'center'}}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= props?.data?.length - 1) {
        ref?.current?.scrollToIndex({
          animated: true,
          index: 0,
        });
      } else {
        ref?.current?.scrollToIndex({
          animated: true,
          index: parseInt(currentIndex) + 1,
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View>
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
        }}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          width: SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
        //   position: 'absolute',
        //   bottom: 10,
        marginTop:7
        }}>
        {props.data?.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                width: currentIndex == i ? 40 : 16,
                height: currentIndex == i ? 10 : 8,
                borderRadius: currentIndex == i ? 5 : 4,
                backgroundColor:
                  currentIndex == i
                    ? COLORS_ILLUSTRATION.stroke
                    : COLORS_ELEMENTS.paragraph,
                marginLeft: 5,
              }}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

export default CarausalForImage;

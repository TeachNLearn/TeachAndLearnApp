import {StyleSheet, View, Image, Dimensions,Text,TouchableOpacity, Alert} from 'react-native';
import React, {useRef} from 'react';
// import { AI, AS, BC, BG, BW, DIMENSIONS, F, FD, H, JC, P, W } from '../styles/style'
// import {COLOR} from '../styles/color';
import Animated from 'react-native-reanimated';
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY, SCREEN_WIDTH } from '../../utils/globalContants';
import YoutubePlayer from "react-native-youtube-iframe";


interface ICARAUSAL {
  data: any;
  style: any;
  imageStyle: any;
  imageContainerWidth: any;
  imageContainerHeight: any;
  movingLinesWidthForIndex: any;
  dotsAlignment: any;
}

const Carausal = (props: any) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const ref:any = useRef(null);
  const [playing, setPlaying] = React.useState<boolean>(false);



  const rendeItems: any = ({item}:any) => {
    return (
      <Animated.View style={{width:props?.imageContainerWidth , height:props?.imageContainerHeight-0,marginLeft:5}}>
         {/* <View>
            <Image resizeMode='cover' style={props.imageStyle} source={item.image}/>
         </View> */}
          <View style={{height:props?.imageContainerHeight-10,overflow:'hidden',backgroundColor:COLORS_ILLUSTRATION.stroke,borderRadius:10}}>
          <View>
          <YoutubePlayer
           height={190}
          //  onChangeState={(e)=>console.log(e)}
          //  play={false}
           videoId={item.videoId}
           mediaplaybackrequiresuseraction={true}
           forceAndroidAutoplay={false}
           webViewStyle={{
            // borderRadius:'1rem',
            // marginTop:10,
           }}
          />
          </View>
          <View>
            <Text style={{flexWrap:'wrap',textAlign:'center',fontFamily:FONT_FAMILY.NUNITO_BOLD,color:COLORS_ILLUSTRATION.main,padding:10}}>{item?.text}</Text>
          </View>
          </View>
      </Animated.View>
    );
  };

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
      style={{flexDirection:'row',width:SCREEN_WIDTH-25,justifyContent:'center',alignItems:'center',position:'absolute',bottom:-10}}>
        {props.data?.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                width: currentIndex == i ? 40 : 16,
                height: currentIndex == i ? 10 : 8,
                borderRadius: currentIndex == i ? 5 : 4,
                backgroundColor:
                  currentIndex == i ? COLORS_ILLUSTRATION.stroke : COLORS_ELEMENTS.paragraph,
                marginLeft: 5,
              }}/>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default Carausal;


  

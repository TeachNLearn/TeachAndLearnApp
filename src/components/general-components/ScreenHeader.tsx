import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
} from '../../utils/globalContants';

interface LearnCardHeaderProps {
  title: string;
  onBackPress: () => void;
  onMenuPress?: () => void;
  ShowMenuIcon: boolean;
  isCreate:boolean,
  showBackIcon:booleanl
}

const ScreenHeader: React.FC<LearnCardHeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
  ShowMenuIcon = true,
  isCreate = false,
  showBackIcon=true
}) => {
  return (
    <View style={styles.learncardHeadContainer}>
    {
      showBackIcon?(
        <View
        style={[
          styles.iconCont,
          {
            borderWidth: 1,
            width: 35,
            height: 35,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: COLORS_ELEMENTS.grey,
          },
        ]}>
       {
       
          <Ionicon
          name="arrow-back-sharp"
          size={20}
          color="#000"
          onPress={onBackPress}
        />
      
       }
      </View>
      ):<View style={{width:20}}></View>
    }
      <View style={styles.headingCont}>
        <Text style={styles.headTxt}>{title}</Text>
      </View>
      <View style={styles.iconCont}>
       {
        isCreate && onMenuPress ?(
          <Pressable onPress={()=>onMenuPress()} style={{marginLeft:-10}}>
            <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Create</Text>
          </Pressable>
        ):(
          ShowMenuIcon &&
            onMenuPress && ( // Render the menu icon conditionally
              <Ionicon
                name="ellipsis-vertical-sharp"
                size={20}
                color="#000000"
                onPress={onMenuPress}
              />
            )
        )
       }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  learncardHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    elevation: 12,
    zIndex: 999,
  },
  headTxt: {
    flex: 1,
    textAlign: 'center',
    // fontWeight: '600',
    fontSize: 20,
    color: '#000',
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    letterSpacing: 0.36,
  },
  iconCont: {
    // width: '10%'
    // paddingLeft:10,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  headingCont: {
    width: '80%',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },
});

export default ScreenHeader;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface LearnCardHeaderProps {
  title: string;
  onBackPress: () => void;
  onMenuPress: () => void;
  ShowMenuIcon : boolean ;
}

const CardHeader: React.FC<LearnCardHeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
  ShowMenuIcon = true ,
}) => {
  return (
    <View style={styles.learncardHeadContainer}>
      <Ionicon name="arrow-back-sharp" size={20} color="#000" onPress={onBackPress} />
      <Text style={styles.headTxt}>{title}</Text>
       {ShowMenuIcon && onMenuPress && ( // Render the menu icon conditionally
        <Ionicon
          name="ellipsis-vertical-sharp"
          size={20}
          color="#000000"
          onPress={onMenuPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  learncardHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // height: 150,
    paddingVertical:36 ,
    paddingTop:32 ,
    backgroundColor: '#f5f5f5',
    elevation:8 ,
  },
  headTxt: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color:'#000' ,
    fontFamily:'Nunito',
    letterSpacing:0.36 ,
    
    
  },
});

export default CardHeader;

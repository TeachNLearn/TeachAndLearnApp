import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface LearnCardHeaderProps {
  title: string;
  onBackPress: () => void;
  onMenuPress: () => void;
}

const CardHeader: React.FC<LearnCardHeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
}) => {
  return (
    <View style={styles.learncardHeadContainer}>
      <Ionicon name="arrow-back-sharp" size={20} color="#000" onPress={onBackPress} />
      <Text style={styles.headTxt}>{title}</Text>
      <Ionicon
        name="ellipsis-vertical-sharp"
        size={20}
        color="#000000"
        onPress={onMenuPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  learncardHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#f5f5f5',
  },
  headTxt: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CardHeader;

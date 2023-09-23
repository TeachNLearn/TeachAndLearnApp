import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface LearnCardHeaderProps {
  title: string;
  onBackPress: () => void;
  onMenuPress: () => void;
  ShowMenuIcon: boolean;
}

const CardHeader: React.FC<LearnCardHeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
  ShowMenuIcon = true,
}) => {
  return (
    <View style={styles.learncardHeadContainer}>
      <View style={styles.iconCont}>
        <Ionicon
          name="arrow-back-sharp"
          size={20}
          color="#000"
          onPress={onBackPress}
        />
      </View>
      <View style={styles.headingCont}>
        <Text style={styles.headTxt}>{title}</Text>
      </View>
      <View style={styles.iconCont}>
        {ShowMenuIcon &&
          onMenuPress && ( // Render the menu icon conditionally
            <Ionicon
              name="ellipsis-vertical-sharp"
              size={20}
              color="#000000"
              onPress={onMenuPress}
            />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  learncardHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    elevation: 12,
  },
  headTxt: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: '#000',
    fontFamily: 'Nunito',
    letterSpacing: 0.36,
  },
  iconCont: {
    width: '10%',
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

export default CardHeader;

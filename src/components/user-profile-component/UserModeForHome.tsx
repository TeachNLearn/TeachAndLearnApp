import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch} from 'react-native-switch';
import { FONT_FAMILY } from '../../utils/globalContants';
interface ModeSwitchProps {
  isLearnMode: boolean;
  toggleMode: () => void;
  learnModeText: string;
  teachModeText: string;
}

const UserModeForHome: React.FC<ModeSwitchProps> = ({
  isLearnMode,
  toggleMode,
  learnModeText,
  teachModeText,
}) => {
  // update mode api

  return (
    <View style={styles.ModeOfuserConainer}>
      <Text
        style={isLearnMode ? styles.LearnModeTextActive : styles.LearnModeText}>
        {learnModeText}
      </Text>
      <Switch
        value={isLearnMode}
        onValueChange={toggleMode}
        disabled={false}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={16}
        barHeight={14}
        circleBorderWidth={1}
        backgroundActive={'#fff'}
        backgroundInactive={'#fff'}
        // circleActiveColor={'#094067'}
        // circleInActiveColor={'#094067'}
        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{
          backgroundColor: '#3da9fc',
          marginLeft: 2,
          marginRight: 2,
          marginTop: 2,
          marginBottom: 2,
          borderColor: '#FFF',
        }} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{borderRadius: 50}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      />
      <Text
        style={
          !isLearnMode ? styles.TeachModeTextActive : styles.TeachModeText
        }>
        {teachModeText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ModeOfuserConainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#094067',
    // borderRadius: 60,
    // margin: 20,
    // padding: 20,
    // width: '120%',
  },

  LearnModeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD

  },

  TeachModeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD
  },

  LearnModeTextActive: {
    color: '#C2B9F9',
    fontSize: 16,
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD
  },

  TeachModeTextActive: {
    color: '#C2B9F9',
    fontSize: 16,
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD

  },
});

export default UserModeForHome;

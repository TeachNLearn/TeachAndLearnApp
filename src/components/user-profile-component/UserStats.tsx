import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FONT_FAMILY } from '../../utils/globalContants';

interface InfoBlockProps {
  label: string;
  value: number | string;
}

const UserStats: React.FC<InfoBlockProps> = ({label, value}) => {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.MyInfotxthead}>{label}</Text>
      <Text style={styles.MyInfotxtNum}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    flexDirection: 'column',
    borderRadius: 50,
  },

  MyInfotxthead: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.24,
    fontFamily: FONT_FAMILY.NUNITO_MEDIUM,
  },

  MyInfotxtNum: {
    color: '#FFF',
    fontSize: 26,
    // fontWeight: '700',
    letterSpacing: 0.52,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },
});

export default UserStats;

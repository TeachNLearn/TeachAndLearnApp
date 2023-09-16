import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface UserProfileHeaderProps {
  title: string;
  onBackPress: () => void;
  onMenuPress: () => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back-sharp" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.userUniqueName}>@{title}</Text>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="ellipsis-vertical-sharp" size={20} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  userUniqueName: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.36,
    fontFamily: 'Nunito',
    color: '#000',
    marginBottom: 20,
  },
});

export default UserProfileHeader;

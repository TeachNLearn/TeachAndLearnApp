import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GeneralMenuItemProps {
  iconName?: string;
  text: string;
  onPress: () => void;
  showIcon: boolean;
}

const GeneralMenuItem: React.FC<GeneralMenuItemProps> = ({
  iconName,
  text,
  onPress,
  showIcon,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {showIcon && iconName !== '' && (
        <Ionicons name={iconName as string} size={29} color="#FFF" />
      )}

      <View style={styles.menuItemContent}>
        <Text style={styles.menuText}>{text}</Text>

        <Ionicons name="chevron-forward-outline" size={20} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
};

interface GeneralMenuProps {
  children: ReactNode;
}

const GeneralMenu: React.FC<GeneralMenuProps> = ({children}) => {
  return <View style={styles.menuContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#094067', //Dark blue
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginBottom: 70,
    height: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  menuText: {
    color: '#FFF',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export {GeneralMenu, GeneralMenuItem};

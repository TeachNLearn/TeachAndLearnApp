import React ,{ ReactNode }from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GeneralMenuItemProps {
  iconName: string;
  text: string;
  onPress: () => void;
}

const GeneralMenuItem: React.FC<GeneralMenuItemProps> = ({ iconName, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={iconName} size={29} color="#000000" />
      <View style={styles.menuItemContent}>
        <Text style={styles.menuText}>{text}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#000000" />
      </View>
    </TouchableOpacity>
  );
};

interface GeneralMenuProps {
  children: ReactNode;
}

const GeneralMenu: React.FC<GeneralMenuProps> = ({ children }) => {
  return <View style={styles.menuContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#D8EEFE',
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    marginBottom: 150,
    height: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 30,
    // alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  menuText: {
  color:'#000' ,
  fontFamily:'Nunito' ,
  fontSize:18 ,
  fontWeight:'500' ,
  marginLeft:10 ,
  },
});

export { GeneralMenu, GeneralMenuItem };

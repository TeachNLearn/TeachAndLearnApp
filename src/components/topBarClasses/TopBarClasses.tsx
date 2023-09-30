import {StyleSheet, Text, View,ScrollView,TouchableOpacity} from 'react-native';
import React from 'react';
import Requests from '../SearchComponent/Requests';
import CardHeader from '../general-components/CardHeader';

const TopBarClasses = () => {
  const [activeLink, setActiveLink] = React.useState('Requests');
  const [element, setElement] = React.useState(<Requests />);


  const ELEMENTS= 
    {
        users:'Users',
    
        requests:'Requests',
    
        classes:'Classes',
    }
  
  

  React.useEffect(() => {
    if (activeLink == ELEMENTS.users) {
      setElement(<Requests />);
    } else if (activeLink == ELEMENTS.requests) {
      setElement(<Requests />);
    } else if (activeLink == ELEMENTS.classes) {
      setElement(<Requests />);
    }
  }, [activeLink]);

  const activeLinkHandler = (activeLink: string) => {
    setActiveLink(activeLink);
  };


  return (
    <View style={{flex:1}}>
      <View style={{flex:.2}}>
      <CardHeader
     title='Classes'
     ShowMenuIcon={false}
    //  onBackPress={() => {props.navigation.goBack()}}
     onMenuPress={() => {}}
   />
   <ScrollView
   contentContainerStyle={{
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center',
     marginTop:30,
     
   }}
     >
    
     <TouchableOpacity
       style={[activeLink === ELEMENTS.users && styles.activeSegment]}
       onPress={() => activeLinkHandler(ELEMENTS.users)}  
       >
       <Text style={styles.segmentText}>{ELEMENTS.users}</Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={[activeLink === ELEMENTS.requests && styles.activeSegment]}
       onPress={() => activeLinkHandler(ELEMENTS.requests)}>
       <Text style={styles.segmentText}>{ELEMENTS.requests}</Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={[activeLink === ELEMENTS.classes && styles.activeSegment]}
       onPress={() => activeLinkHandler(ELEMENTS.classes)}>
       <Text style={styles.segmentText}>{ELEMENTS.classes}</Text>
     </TouchableOpacity>
   </ScrollView>
      </View>
   <View style={[{flex:.73},styles.elementWrapper]}>{element}</View>
 </View>
  );
};

export default TopBarClasses;

const styles = StyleSheet.create({
  activeSegment: {
    borderBottomColor: '#674FF1',
    borderBottomWidth: 2,
    // width: '20%',
    alignItems: 'center',
  },
  segmentText: {
    color: '#000',
    // fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  elementWrapper: {
    // marginVertical: 20,
    bottom:30,
    marginHorizontal: 8,
  },
});

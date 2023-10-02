import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import AllClasses from '../../components/class-component/AllClasses';
import UpcomingClasses from '../../components/class-component/UpcomingClasses';
import {AuthContext} from '../../store/auth-context';
import CompletedClasses from '../../components/class-component/CompletedClasses';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import {FONT_FAMILY, SCREEN_WIDTH} from '../../utils/globalContants';

const Classes = (props: any) => {
  const [activeLink, setActiveLink] = useState('all classes');
  const [element, setElement] = useState(<AllClasses />);

  useEffect(() => {
    if (activeLink == 'all classes') {
      setElement(<AllClasses />);
    } else if (activeLink == 'upcoming') {
      setElement(<UpcomingClasses />);
    } else if (activeLink == 'completed') {
      setElement(<CompletedClasses />);
    }
  }, [activeLink]);

  const navigationHandler = (navigateTo: string) => {
    setActiveLink(navigateTo);
  };

  const labels = ['all classes', 'upcoming', 'completed'];

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#fff', flex: 1, width: '100%'}}>
        <ScreenHeader
          title="Classes"
          ShowMenuIcon={false}
          onBackPress={() => {
            props.navigation.goBack();
          }}
          onMenuPress={() => {}}
        />
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 26,
            marginBottom: 26,
            // borderBottomColor: '#b4b4b4',
            // borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={[activeLink === 'all classes' && styles.activeSegment]}
            onPress={() => navigationHandler('all classes')}>
            <Text style={styles.segmentText}>All Classes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[activeLink === 'upcoming' && styles.activeSegment]}
            onPress={() => navigationHandler('upcoming')}>
            <Text style={styles.segmentText}>upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[activeLink === 'completed' && styles.activeSegment]}
            onPress={() => navigationHandler('completed')}>
            <Text style={styles.segmentText}>completed</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.elementWrapper}>{element}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activeSegment: {
    borderBottomColor: '#674FF1',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  segmentText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 0,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },
  elementWrapper: {
    flex: 1,
    marginBottom: 80,
    width: '100%',
    backgroundColor: '#fff',
    // borderColor: '#000',
    // borderWidth: 1,
  },
});

export default Classes;

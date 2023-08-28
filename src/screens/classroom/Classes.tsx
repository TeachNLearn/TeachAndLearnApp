import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AllClasses from '../../components/class-component/AllClasses';
import UpcomingClasses from '../../components/class-component/UpcomingClasses';
import {AuthContext} from '../../store/auth-context';
import CompletedClasses from '../../components/class-component/CompletedClasses';

const Classes = () => {
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
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
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
      </View>
      <View style={styles.elementWrapper}>{element}</View>
    </View>
  );
};

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
    marginVertical: 20,
    marginHorizontal: 8,
  },
});

export default Classes;

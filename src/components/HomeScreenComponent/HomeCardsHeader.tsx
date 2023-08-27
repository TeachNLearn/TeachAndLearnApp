import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import IconS from 'react-native-vector-icons/FontAwesome5';


interface SectionHeaderProps {
    title : string ;
    onViewAllPress : () => void ;
}

const HomeCardsHeader : React.FC<SectionHeaderProps> = ({title , onViewAllPress}) => {
  return (
           <View style={styles.txtOneParentContainer}>
            <Text style={styles.txtOneSecondContainer}>{title}</Text>
            <Text style={styles.txtTwoSecondContainer} onPress={onViewAllPress}>
              See all <IconS name="arrow-right" size={14} color="#000" />{' '}
            </Text>
          </View>
  )
}

const styles = StyleSheet.create({
     txtOneParentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  
   txtOneSecondContainer: {
    margin: 10,
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
  },

  txtTwoSecondContainer: {
    margin: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
})

export default HomeCardsHeader
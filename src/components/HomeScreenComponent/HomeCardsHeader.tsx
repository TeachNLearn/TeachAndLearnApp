import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import IconS from 'react-native-vector-icons/FontAwesome5';
import { FONT_FAMILY } from '../../utils/globalContants';


interface SectionHeaderProps {
    title : string ;
    onViewAllPress : () => void ;
    icon : boolean
}

const HomeCardsHeader : React.FC<SectionHeaderProps> = ({title , onViewAllPress,icon=true}) => {
  return (
           <View style={styles.txtOneParentContainer}>
            <Text style={styles.txtOneSecondContainer}>{title}</Text>
            {
              icon ? (
                <>
                   <Text style={styles.txtTwoSecondContainer} onPress={onViewAllPress}>
                    See all <IconS name="arrow-right" size={14} color="#000" />{' '}
                   </Text>
                </>
              ):null
            }
          </View>
  )
}

const styles = StyleSheet.create({
     txtOneParentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:5,
    marginTop: 20,



  },
  
   txtOneSecondContainer: {
    margin: 10,
    fontSize: 22,
    color: '#000',
    // fontWeight: '700',
    fontFamily:FONT_FAMILY.NUNITO_BOLD


  },

  txtTwoSecondContainer: {
    margin: 10,
    fontSize: 16,
    color: '#000',
    // fontWeight: '600',
    fontFamily:FONT_FAMILY.NUNITO_BOLD,
  },
})

export default HomeCardsHeader
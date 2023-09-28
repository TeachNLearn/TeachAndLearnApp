import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';
interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onProceed: () => void;
  goBack:()=> void;
  btn:string ;
  btn2:string
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onClose , btn , onProceed ,btn2,goBack}) => {
  return (
    <Modal  transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'space-between', marginBottom:10}}>
                  <Text style={styles.title}>{title}</Text>
                  {/* <TouchableOpacity onPress={onClose} >
                     <Ionican name='close-circle-sharp' size={30} color="#094067"/>
                  </TouchableOpacity> */}
                
            </View>
  
          <Text style={styles.message}>{message}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>

               <TouchableOpacity onPress={goBack} style={styles.button2}>
                 <Text style={{color:'#FFF' , fontWeight:'600' , fontSize:12}}>{btn2}</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={onProceed} style={styles.button}>
                 <Text style={{color:'rgb(180, 35, 24)' , fontWeight:'600' , fontSize:12}}>{btn}</Text>
               </TouchableOpacity>
             
         </View>
       
        </View>
      </View>
    </Modal>
  );
};

interface Styles {
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  title: TextStyle;
  message: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  button2: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine:'underline',
    // borderBottomWidth:1 ,
    // borderBottomColor:'#094067' ,
    // width:120,
    color:'#000'
    
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight:29 ,
    color:'black'
  },
  button: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor:'#fecdca' ,
    borderRadius:10,
    marginTop:0 ,
  },
  button2: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor:'rgb(51, 42, 213)' ,
    borderRadius:10,
    marginTop:0 ,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default CustomAlert;

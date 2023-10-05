import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const Search = () => {
  return (
    <View>
        {/* <View style={{borderWidth:1,height:45,borderRadius:5}}> */}
            <TextInput style={{borderWidth:1,borderColor:'#094067',height:40,borderRadius:3,paddingHorizontal:5}}>
                <Icon name='search1' size={20} color={'#094067'}/>
            </TextInput>
        {/* </View> */}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})
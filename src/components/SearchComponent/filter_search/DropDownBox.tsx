import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { FONT_FAMILY, SCREEN_HEIGHT } from '../../../utils/globalContants'
import {subjects} from '../../../data/SUBJECT_LIST.json';
import {languages} from '../../../data/LANGUAGE_LIST.json';
import {standard} from '../../../data/STANDARD_LIST.json';

interface DDB{
    showDropDown:Boolean,
    aboutt:string,
    setField:any,
    setOpenDD:any
}
const DropDownBox:React.FC<DDB> = (props) => {

  return (

     props?.showDropDown ?(
        <ScrollView
        style={{
          borderWidth: 1,
          height: SCREEN_HEIGHT / 1.5,
          zIndex:-1,
          // flex:1,
          padding: 10,
          backgroundColor: '#fff',
        }}>
        <TextInput
          placeholderTextColor={'grey'}
          placeholder={props?.aboutt}
          style={{borderWidth: 1, height: 35, borderRadius: 7}}
        />
        <View style={{marginTop: 10}}>
          {
            props?.aboutt === 'Subject'?(
              <>
                {
                  subjects?.map((e:any,i:number)=>{
                    return (
                     <Pressable  style={{marginTop:5}} onPress={()=>{props.setField(e),props.setOpenDD(false)}} key={i}>
                      <Text style={{marginTop: 10, fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
                        {e}
                      </Text>
                     </Pressable>
                    )
                  })
                }
              </>
            ):props?.aboutt === 'Class'?(
              <>
              {
                standard?.map((e:any,i:number)=>{
                  return (
                   <Pressable style={{marginTop:5}} onPress={()=>{props.setField(e),props.setOpenDD(false)}} key={i}>
                    <Text style={{marginTop: 10, fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
                      {e}
                    </Text>
                   </Pressable>
                  )
                })
              }
            </>
            ):props?.aboutt === 'Language'?(
              <>
              {
                languages?.map((e:any,i:number)=>{
                  return (
                   <Pressable style={{marginTop:5}} onPress={()=>{props.setField(e),props.setOpenDD(false)}} key={i}>
                    <Text style={{marginTop: 10, fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
                      {e}
                    </Text>
                   </Pressable>
                  )
                })
              }
            </>
            ):null
          }
        </View>
      </ScrollView>
     ):(
        null
     )
  )
}

export default DropDownBox

const styles = StyleSheet.create({})
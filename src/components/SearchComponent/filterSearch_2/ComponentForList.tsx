import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONT_FAMILY } from '../../../utils/globalContants'

interface ILIST{
  component:string[],
  setSelectOneComponent:any,
  selectOneComponent:any

}

const ComponentForList:React.FC<ILIST> = ({component,selectOneComponent,setSelectOneComponent}) => {
  return (
    <>
     {
             component.map((e:any,i:number)=>{
                return (
                 <Pressable onPress={()=>setSelectOneComponent(e)} style={{marginTop:5,borderWidth:.8,marginLeft:10,borderRadius:10,padding:5,backgroundColor:selectOneComponent === e?'#222':'#fff'}} key={i}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,color:selectOneComponent === e?'#fff':'#222'}}>
                    {e}
                  </Text>
                 </Pressable>
                )
              })
     }
    </>
  )
}

export default ComponentForList

const styles = StyleSheet.create({})
import { StyleSheet, View,ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS_ILLUSTRATION } from '../../utils/globalContants'

const Loader = () => {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator size={'large'} color={COLORS_ILLUSTRATION.stroke} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})
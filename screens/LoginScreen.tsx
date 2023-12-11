import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoginScreen({navigation}: any) {
  return (
    <View>
      <Text style={{fontSize:30}}>Login</Text>
     
      <Button title='Ingresar' onPress={()=> navigation.navigate('Drawer_Welcome') }/>

      <Text onPress={()=> navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

  }
})
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//FIREBASE
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../config/Config';
export default function WelcomeScreen( {navigation}: any) {
  const cerrarSesion=()=>{

    signOut(auth).then(() => {
      // Sign-out successful.
      Alert.alert('Mensaje','Se cerro la sesion')
      navigation.navigate('Login')
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
     const errorMessage = error.message;
      Alert.alert(errorCode,errorMessage)
    });

  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido!</Text>
      <Image 
        source={{uri:"https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"}}
        style={styles.img}
      />
      <Button color='green' title='Cerrar Sesion' onPress={()=>cerrarSesion()}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titulo:{
    marginVertical:20,
    color:'#FF7E00',
    fontSize:25,
    fontWeight:'bold'
  },
  img: {
    width: 450,
    height: 300,
    resizeMode: "contain",
    marginVertical:20,

  },

})
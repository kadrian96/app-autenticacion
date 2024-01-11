import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function LoginScreen({navigation}: any) {
const [correo, setcorreo] = useState('')
const [contrasenia, setcontrasenia] = useState('')

  function login(){
    signInWithEmailAndPassword(auth, correo, contrasenia)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('ACCESO CORRECTO')
    Alert.alert('Mensaje','Inicio de Sesion exitoso')
    navigation.navigate('Drawer_Welcome')
  })
  .catch((error) => {
    console.log('ACCESO DENEGADO')
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // if(errorCode==='auth/invalid-credential'){
    //   Alert.alert('Error','Las credenciales son incorrectas')
    
    // }else if(errorCode==='auth/missing-password'){
    //   Alert.alert('Error','La contraseña no se ha enviado')
    // }else {
    //   Alert.alert(errorCode,errorMessage)
    // }
    switch (errorCode) {
      case 'auth/invalid/credential':
        Alert.alert('Error', 'Las Credenciales son Incorrectas');
        break;
        case 'auth/missing-password':
        Alert.alert('Autenticación', 'Ingrese la contraseña')
        break;
        case 'auth/missing-email':
        Alert.alert('Autenticación', 'Ingrese el Correo')
        break;
        default:
          Alert.alert(errorCode,errorMessage)
    }

  });
    setcorreo("")
    setcontrasenia("")
  }
  return (
    <ImageBackground style={styles.container} source={{uri:'https://img.freepik.com/foto-gratis/disparo-vertical-geiseres-parque-nacional-yellowstone-estados-unidos_181624-58620.jpg'}} >
      <View style={styles.login}>
        <Image style={styles.image} source={require('../assets/img/inicio-sesion.png')}/>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresar correo'
        onChangeText={(texto)=>setcorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none' // por defecto la primera letra sera en minusculas
        value={correo}
      />
        <TextInput
        style={styles.input}
        placeholder='Ingresar contraseña'
        onChangeText={(texto)=>setcontrasenia(texto)}
        secureTextEntry={true}
        value={contrasenia}
        
      />
     
      <Button title='Ingresar' onPress={()=> login()}/>

      <Text style={styles.txtregister} onPress={()=> navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
      </View>
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    //alignContent:'center',
    resizeMode:'cover',
    //justifyContent:'center'
    // backgroundColor:'#EFDECD'
  },
  login:{
   marginVertical:150,
    width:'90%',
    height:'60%',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderWidth:2,
    
    borderColor:'white',
    backgroundColor:'white'

  },
  image: {
    resizeMode: "contain",
    height: 150,
    width: "100%",
    marginTop: 20,
  },
  titulo:{
    fontSize:30,
    marginTop:20,
    marginBottom:20,
    color:'#3B7A57',
    fontWeight:'bold'
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    //borderRadius:5,
    backgroundColor:'white'
    
    
  },
  txtregister:{
    marginVertical:20,
    textDecorationLine:'underline',
    color:'#A1CAF1'
  }

})
import {
  Alert,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
//firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";
export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        Alert.alert("Mensaje", "Registro Exitoso");
        navigation.navigate("Drawer_Welcome");

        //console.log('Registro exitoso')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        switch (errorCode) {
          case "auth/email-alredy-in-use":
            Alert.alert("Error", "El correo ingresado ya esta en uso");
            break;
          case "auth/missing-password":
            Alert.alert("Autenticación", "Ingrese la contraseña");
            break;
          case "auth/missing-email":
            Alert.alert("Autenticación", "Ingrese el Correo");
            break;
          default:
            Alert.alert(errorCode, errorMessage);
        }
      });
      setcorreo("")
      setcontrasenia("")
  }
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/foto-gratis/disparo-vertical-geiseres-parque-nacional-yellowstone-estados-unidos_181624-58620.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.registro}>
        <Text style={styles.titulo}>Registrate</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese email"
          onChangeText={(texto) => setcorreo(texto)}
          keyboardType="email-address"
          autoCapitalize="none" // por defecto la primera letra sera en minusculas
          value={correo}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese contraseña"
          onChangeText={(texto) => setcontrasenia(texto)}
          autoCapitalize="none" // por defecto la primera letra sera en minusculas
          value={contrasenia}
          secureTextEntry={true}

        />
        <Button title="Registrarse" onPress={() => registro()} />
        <Text style={styles.txtregister} onPress={()=> navigation.navigate('Login')}> 👉 Ya tengo cuenta 👈</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    resizeMode:'cover'
  },
  registro: {
    marginVertical: 150,
    width: "90%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderWidth: 2,

    borderColor: "white",
    backgroundColor: "white",
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
});

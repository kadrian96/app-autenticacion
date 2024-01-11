import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

//FIREBASE
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/Config";
export default function GeneralScreen() {
  const [imagen, setImagen] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png");

  const seleccionarImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  //SUBIR IMAGEN

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, "usuarios/" + nombre); //se puede coloccar una carpeta para subir el archivo

    try {
      //toman la imagen y la transforman en formato binario
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });

      console.log("La imagen se subió con éxito");
      Alert.alert('Mensaje','La imagen se subio correctamente')
      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SUBIR IMAGEN DESDE LA CAMARA</Text>
      <Button title="abrir camara" onPress={() => seleccionarImagen()} />
      <Image style={styles.img} source={{ uri: imagen }} />
      <TouchableOpacity style={styles.btn} onPress={()=>subirImagen('avatar2')}>
        <Text style={{fontWeight:'bold'}}>SUBIR IMAGEN A FIREBASE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  img: {
    width: 450,
    height: 300,
    resizeMode: "contain",
  },
  titulo:{
    fontSize:20,
    marginTop:20,
    marginBottom:20,
    color:'#FF7E00',
    fontWeight:'bold'

  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: "#ACE1AF",
    justifyContent:'center',
    alignItems:'center'
  },
});

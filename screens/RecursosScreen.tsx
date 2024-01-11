import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

// 77FIREBASE
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/Config";
import { TextInput } from 'react-native-gesture-handler';


export default function RecursosScreen() {
  const [imagen, setImagen] = useState(" ");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };
  //SUBIR IMAGEN

  async function subirImagen(nombre:string) {
    const storageRef = ref(storage, "usuarios/" + nombre); //se puede coloccar una carpeta para subir el archivo

    try {
      //toman la imagen y la transforman en formato binario
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });

      console.log("La imagen se subió con éxito");

      // Obtiene la URL de la imagen
     // const imageURL = await getDownloadURL(storageRef);
     // console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SUBIR UNA IMAGEN DESDE LA GALERIA</Text>
      <Button title="Abrir galeria" onPress={() => pickImage()} />
      <Image style={styles.img} source={{ uri: imagen }} />
      <Button title="subir imagen" onPress={() => subirImagen('avatar1')}/>
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
});

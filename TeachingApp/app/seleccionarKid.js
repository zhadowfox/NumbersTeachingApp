import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SeleccionarKid() {

  const router = useRouter();
  const [hijos, setHijos] = useState([]);

  useEffect(() => {
    cargarHijos();
  }, []);

  const cargarHijos = async () => {
    const data = await AsyncStorage.getItem("usuario");

    if (!data) return;

    const usuario = JSON.parse(data);

    setHijos(usuario.hijos || []);
  };

  const seleccionarHijo = async (hijo) => {

    await AsyncStorage.setItem("hijoActivo", JSON.stringify(hijo));

    router.replace("/dashboard");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        ¿Quién va a aprender hoy?
      </Text>

      {hijos.map((hijo, index) => (

        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => seleccionarHijo(hijo)}
        >
          <Text style={styles.name}>
            {hijo.nombre}
          </Text>

          <Text style={styles.age}>
            {hijo.edad} años
          </Text>

        </TouchableOpacity>

      ))}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40
  },

  card: {
    backgroundColor: "#4facfe",
    width: 250,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center"
  },

  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  },

  age: {
    color: "white",
    fontSize: 16
  }

});
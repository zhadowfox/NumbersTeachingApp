import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function RegisterChildScreen() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");

  const handleRegisterChild = () => {
    console.log({ nombre, apellido, edad });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <Text style={styles.title}>Registrar Hijo</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            placeholder="Apellido"
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
          />

          <TextInput
            placeholder="Edad"
            style={styles.input}
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleRegisterChild}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },

  form: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#00c334",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
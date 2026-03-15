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
import {  useRouter, useLocalSearchParams  } from "expo-router";
import { useState } from "react";



import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterChildScreen() {
  const { nombre, apellido, correo, password } = useLocalSearchParams();
const [nombreHijo, setNombreHijo] = useState("");
const [apellidoHijo, setApellidoHijo] = useState("");
const [edadHijo, setEdadHijo] = useState("");

const [hijos, setHijos] = useState([]);
const router = useRouter();
  const handleRegisterChild = () => {
    console.log({ nombre, apellido, edad });
    router.push("/dashboard");
  };



const agregarOtro = () => {

  const nuevoHijo = {
    nombre: nombreHijo,
    apellido: apellidoHijo,
    edad: edadHijo
  };

  setHijos([...hijos, nuevoHijo]);

  // limpiar formulario
  setNombreHijo("");
  setApellidoHijo("");
  setEdadHijo("");
};

const finalizarRegistro = async () => {

  const nuevoHijo = {
    nombre: nombreHijo,
    apellido: apellidoHijo,
    edad: edadHijo
  };

  const todosLosHijos = [...hijos, nuevoHijo];

  const usuario = {
    nombre,
    apellido,
    correo,
    password,
    hijos: todosLosHijos
  };

  await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

  alert("Registro completado");

  router.replace("/dashboard");
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
            value={nombreHijo}
            onChangeText={setNombreHijo}
          />

          <TextInput
            placeholder="Apellido"
            style={styles.input}
            value={apellidoHijo}
            onChangeText={setApellidoHijo}
          />

          <TextInput
            placeholder="Edad"
            style={styles.input}
            value={edadHijo}
            onChangeText={setEdadHijo}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={agregarOtro}>
        
              <Text style={styles.buttonText}>Registrar otro hijo</Text>
      
          </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFinish} onPress={finalizarRegistro}>
        
              <Text style={styles.buttonText}>Finalizar</Text>
      
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
    backgroundColor: "#0033cc",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
    buttonFinish: {
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
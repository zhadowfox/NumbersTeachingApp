import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform, Image
} from "react-native";

import { Link } from "expo-router";
import { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <Image source={require("../assets/images/sing 1.png")} style={{width:300, height:300}} resizeMode="contain" />

        <Text style={styles.title}>Bienvenido</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#999"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.buttonLogin}>
            <Link href={"/dashboard"}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Link>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonRegister}>
  <Link href={"/register"}>
            <Text style={styles.buttonText}>Registrarse</Text>
               </Link>
          </TouchableOpacity>


          <TouchableOpacity>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>

      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },

  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
    alignContent: "center",
    
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 40,
  },

  form: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    fontFamily: "Comic Sans MS"
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 25,
    borderRadius: 12,
    marginBottom: 15,
    width: 300,
    
  },

  buttonLogin: {
    backgroundColor: "#4facfe",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonRegister: {
    backgroundColor: "#00c334",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#4facfe",
    fontWeight: "600",
  },
});
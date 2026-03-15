import { useState } from "react";
import {
View,
Text,
TouchableOpacity,
StyleSheet
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function Juegos() {



const generarPreguntas = () => {

  const lista = [];

  for (let i = 0; i < 10; i++) {

    const numero = Math.floor(Math.random() * 10) + 1;
    const incorrecto = numero + Math.floor(Math.random() * 3) + 1;

    const opciones =
      Math.random() > 0.5
        ? [numero, incorrecto]
        : [incorrecto, numero];

    lista.push({
      numero,
      opciones,
      correcta: numero
    });
  }

  return lista;
};

const router = useRouter();
const [preguntas] = useState(generarPreguntas());
const [indice, setIndice] = useState(0);
const [resultados, setResultados] = useState({});
const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
const [colorRespuesta, setColorRespuesta] = useState({});
const responder = (opcion) => {

  if (respuestaSeleccionada !== null) return;

  const preguntaActual = preguntas[indice];

  const ahora = new Date();

  const fecha = ahora.toISOString().split("T")[0];
  const hora = ahora.toTimeString().split(" ")[0];

  const esCorrecta = opcion === preguntaActual.correcta;

  const resultado = esCorrecta ? "correcta" : "incorrecta";

  setRespuestaSeleccionada(opcion);

  setColorRespuesta({
    [opcion]: esCorrecta ? "#179706" : "red"
  });

  const nuevosResultados = {
    ...resultados,
    [`pregunta${indice + 1}`]: {
      respuesta: resultado,
      fecha,
      hora
    }
  };

  setResultados(nuevosResultados);

  setTimeout(() => {

    setRespuestaSeleccionada(null);
    setColorRespuesta({});

    if (indice < 9) {
      setIndice(indice + 1);
    } else {
      guardarIntento(nuevosResultados);
    }

  }, 2000);
};

const guardarIntento = async (respuestas) => {

  const ahora = new Date();

  const fechaIntento = ahora.toISOString().split("T")[0];
  const horaIntento = ahora.toTimeString().split(" ")[0];

  const dataUsuario = await AsyncStorage.getItem("usuario");
  const dataHijo = await AsyncStorage.getItem("hijoActivo");

  const usuario = JSON.parse(dataUsuario);
  const hijoActivo = JSON.parse(dataHijo);

  const hijo = usuario.hijos.find(
    h => h.nombre === hijoActivo.nombre
  );

  if (!hijo.juegos) hijo.juegos = {};

  const numeroIntento =
    Object.keys(hijo.juegos).length + 1;

  hijo.juegos[numeroIntento] = {
    fechaIntento,
    horaIntento,
    ...respuestas
  };

  await AsyncStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  );

  alert("Juego terminado");
  router.push("/dashboard");
};

return (

<View style={styles.container}>

<Text style={styles.numero}>
{preguntas[indice].numero}
</Text>

<Text style={styles.subTitle}>
Selecciona el numero correcto
</Text>
<View style={styles.containerOptions}>
{preguntas[indice].opciones.map((op, i) => (

<TouchableOpacity
key={i}
style={[
  styles.opcion,
  colorRespuesta[op] && { backgroundColor: colorRespuesta[op] }
]}
onPress={() => responder(op)}
>

<Text style={styles.opcionTexto}>
{op}
</Text>

</TouchableOpacity>

))}
</View>
</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center"
},
containerOptions:{
flexDirection:"row",
marginTop:40
},
numero:{
fontSize:250,
fontWeight:"bold",
marginBottom:40,
color:"#fff",
backgroundColor:"#0a5600",
padding:20,
borderRadius:20
},
subTitle:{
fontSize:35,
fontWeight:"bold",
color:"#333",
backgroundColor:"#f2f2f2",padding:10,
borderRadius:15,
marginBottom:20
},
opcion:{

backgroundColor:"#700098",
padding:20,
margin:10,
borderRadius:15,
width:150,
alignItems:"center"
},

opcionTexto:{
color:"white",
fontSize:100,
fontWeight:"bold"
}

});
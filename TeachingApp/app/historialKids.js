import { useEffect, useState } from "react";
import {
View,
Text,
TouchableOpacity,
StyleSheet,
ScrollView,
Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistorialKids() {

const [usuario, setUsuario] = useState(null);
const [hijoSeleccionado, setHijoSeleccionado] = useState(null);

useEffect(() => {
cargarUsuario();
}, []);

const cargarUsuario = async () => {

const data = await AsyncStorage.getItem("usuario");

if (!data) return;

setUsuario(JSON.parse(data));

};

const eliminarIntento = async (numeroIntento) => {

  const dataUsuario = await AsyncStorage.getItem("usuario");
  const dataHijo = await AsyncStorage.getItem("hijoActivo");

  const usuario = JSON.parse(dataUsuario);
  const hijoActivo = JSON.parse(dataHijo);

  const hijoIndex = usuario.hijos.findIndex(
    h => h.nombre === hijoActivo.nombre
  );

  if (hijoIndex === -1) return;

  const hijo = usuario.hijos[hijoIndex];

  if (!hijo.juegos) return;

  // borrar SOLO el intento seleccionado
  delete hijo.juegos[numeroIntento];

  // guardar nuevamente el hijo
  usuario.hijos[hijoIndex] = hijo;

  await AsyncStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  );

  alert("Intento eliminado");

};

if (!usuario) return null;

return (

<ScrollView style={styles.container}>

<Text style={styles.titulo}>
Historial de Juegos
</Text>

{/* LISTA DE HIJOS */}

{!hijoSeleccionado && usuario.hijos.map((hijo,index)=>(

<TouchableOpacity
key={index}
style={styles.hijoCard}
onPress={()=>setHijoSeleccionado(hijo)}
>

<Text style={styles.hijoNombre}>
{hijo.nombre}
</Text>

</TouchableOpacity>

))}

{/* INTENTOS */}

{hijoSeleccionado && (

<View>

<Text style={styles.subtitulo}>
Intentos de {hijoSeleccionado.nombre}
</Text>

{hijoSeleccionado.juegos &&
Object.entries(hijoSeleccionado.juegos).map(
([numero,intento]) => (

<View key={numero} style={styles.intentoCard}>

<Text style={styles.intentoTitulo}>
Intento {numero}
</Text>

<Text>
Fecha: {intento.fechaIntento}
</Text>

<Text>
Hora: {intento.horaIntento}
</Text>

{/* PREGUNTAS */}

{Object.entries(intento)
.filter(([k]) => k.startsWith("pregunta"))
.map(([preg,data]) => (

<View key={preg} style={styles.pregunta}>

<Text>
{preg}
</Text>

<Text>
Resultado: {data.respuesta}
</Text>

<Text>
Fecha: {data.fecha}
</Text>

<Text>
Hora: {data.hora}
</Text>

</View>

))}

<TouchableOpacity
style={styles.borrarBtn}
onPress={()=>eliminarIntento(numero)}
>

<Text style={styles.borrarText}>
Borrar intento
</Text>

</TouchableOpacity>

</View>

))

}

<TouchableOpacity
style={styles.volverBtn}
onPress={()=>setHijoSeleccionado(null)}
>

<Text style={styles.volverText}>
Volver
</Text>

</TouchableOpacity>

</View>

)}

</ScrollView>

);

}


const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

titulo:{
fontSize:28,
fontWeight:"bold",
marginBottom:20
},

subtitulo:{
fontSize:22,
fontWeight:"bold",
marginBottom:20
},

hijoCard:{
backgroundColor:"#4facfe",
padding:20,
borderRadius:15,
marginBottom:15
},

hijoNombre:{
color:"white",
fontSize:20,
fontWeight:"bold"
},

intentoCard:{
backgroundColor:"#f5f5f5",
padding:20,
borderRadius:10,
marginBottom:20
},

intentoTitulo:{
fontSize:20,
fontWeight:"bold",
marginBottom:10
},

pregunta:{
marginTop:10,
padding:10,
backgroundColor:"#e9e9e9",
borderRadius:8
},

borrarBtn:{
backgroundColor:"#ff4d4d",
padding:10,
borderRadius:10,
marginTop:15,
alignItems:"center"
},

borrarText:{
color:"white",
fontWeight:"bold"
},

volverBtn:{
backgroundColor:"#4facfe",
padding:15,
borderRadius:10,
alignItems:"center",
marginTop:20
},

volverText:{
color:"white",
fontWeight:"bold"
}

});
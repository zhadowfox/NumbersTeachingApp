import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground,TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link,useRouter } from "expo-router";
const recursos = {
  "1": require("../assets/images/Recurso 1.png"),
  "2": require("../assets/images/Recurso 2.png"),
  "3": require("../assets/images/canciones.png"),
};

const backgroundImage = require("../assets/images/background.png");

export default function dashboard() {
    const router = useRouter();



  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      
      {/* BANNER ARRIBA */}
      <Image
        source={require("../assets/images/banner principal.png")}
        style={styles.banner}
        resizeMode="contain"
      />

      {/* CONTENIDO CENTRAL */}
      <View style={styles.cardsContainer}>
       
       <Card
          number="1"
          title="Aprende"
          colors={["#FF0000", "#FF6F4B"]}
          textColor="#ffffff"
          recurso="1"
          onPress={() => router.push("/aprende")}
        />
   
        <Card
          number="2"
          title="Juegos"
          colors={["#AE00FF", "#8A00E6"]}
          textColor="#ffffff"
          recurso="2"
          onPress={() => router.push("/aprende")}
        />

        <Card
          number="3"
          title="Canciones"
          colors={["#4858FF", "#2629E0"]}
          textColor="#ffffff"
          recurso="3"
          onPress={() => router.push("/aprende")}
        />
      </View>



      <StatusBar style="auto" />
            {/* FOOTER ABAJO */}
      <Image
        source={require("../assets/images/footerImage.png")}
        style={styles.footer}
        resizeMode="contain"
      />
    </ImageBackground>
  );
}

function Card({ number, title, colors, textColor,onPress, recurso }) {
  return (

    <TouchableOpacity onPress={onPress} style={{ zIndex: 100 }}>
      <LinearGradient colors={colors} style={styles.card}>
  
        {/* ROW 1 */}
        <View style={styles.topRow}>
          <Text style={[styles.number, { color: textColor }]}>
            {number}
          </Text>

          <Image
              source={recursos[recurso]}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>

        {/* ROW 2 */}
        <Text style={[styles.title, { color: textColor }]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between", // distribuye arriba-centro-abajo
  },

  banner: {
    width: "100%",
    height: 400,
  },

  cardsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
    cardImage: {
    width: 70,
    height: 70,
  },
  card: {
    borderRadius: 20,
    padding: 1,
    marginBottom: 20,
    display: "grid  ",
    zIndex: 200,
    
  
    alignItems: "center",
    border: "4",
    borderColor: "#fff",
    borderWidth: 4,
  },  

  number: {
    fontSize: 40,
    fontWeight: "bold", 
     
    
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  footer: {
    width: "100%",
    height: 200,
    zIndex: 10
    
    
  },
});
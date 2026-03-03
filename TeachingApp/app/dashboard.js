import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const backgroundImage = require("../assets/images/background.png");

export default function dashboard() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      
      {/* BANNER ARRIBA */}
      <Image
        source={require("../assets/images/banner principal.png")}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* CONTENIDO CENTRAL */}
      <View style={styles.cardsContainer}>
        <Card
          number="1"
          title="Aprende"
          colors={["#FF0000", "#FF6F4B"]}
          textColor="#aa2808"
        />
        <Card
          number="2"
          title="Juegos"
          colors={["#AE00FF", "#8A00E6"]}
          textColor="#53008a"
        />
        <Card
          number="3"
          title="Canciones"
          colors={["#4858FF", "#2629E0"]}
          textColor="#0f1b9b"
        />
      </View>

      {/* FOOTER ABAJO */}
      <Image
        source={require("../assets/images/footerImage.png")}
        style={styles.footer}
        resizeMode="contain"
      />

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

function Card({ number, title, colors, textColor }) {
  return (
    <LinearGradient colors={colors} style={styles.card}>
      <Image source={require("../assets/images/Recurso 1.png")} style={{ width: 80, height: 80, marginBottom: 20, position:"absolute" }} />
      <Text style={[styles.number, { color: textColor }]}>{number}</Text>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between", // distribuye arriba-centro-abajo
  },

  banner: {
    width: "100%",
    height: 200,
  },

  cardsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    border: "4px solid #fff",
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
  },
});
import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/footer";

const { width } = Dimensions.get("window");

export default function Aprende() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    require("../assets/videos/video1.mp4"),
    require("../assets/videos/video2.mp4"),
    require("../assets/videos/video3.mp4"),
  ];

const videoRef = useRef(null);

  const goNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* FLECHAS */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} disabled={currentIndex === 0}>
          <Ionicons
            name="arrow-back-circle"
            size={40}
            color={currentIndex === 0 ? "#bb8c00" : "#ffde4d"}
          />
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {videos.length}
        </Text>

        <TouchableOpacity
          onPress={goNext}
          disabled={currentIndex === videos.length - 1}
        >
          <Ionicons
            name="arrow-forward-circle"
            size={40}
            color={
              currentIndex === videos.length - 1 ? "#bb8c00" : "#ffde4d"
            }
          />
        </TouchableOpacity>
      </View>

      {/* VIDEO */}
      <Video
        ref={videoRef}
        source={videos[currentIndex]}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />

      {/* INDICADORES */}
      <View style={styles.dotsContainer}>
        {videos.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },

  header: {
    position: "absolute",
    top: 0,
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgb(124, 97, 0)",
    zIndex: 10,
  },

  counter: {
    fontSize: 25,
    fontWeight: "bold",color: "#ffde4d",
    fontFamily: "Comic Sans MS",
    bagkgroundColor: "#ffd000",
    rounded: 100,
    padding:20
  },

  video: {
    width: width,
    height: 300,
    alignSelf: "center",
    
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#b38300",
  },
});
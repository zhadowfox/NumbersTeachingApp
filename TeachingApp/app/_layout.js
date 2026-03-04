import { Slot } from "expo-router";
import { ImageBackground,  StyleSheet } from "react-native";
const backgroundImage = require("../assets/images/background.png");

export default function Layout() {
    return(

 <ImageBackground source={backgroundImage} style={styles.background}>
 

             <Slot />
        
       
        </ImageBackground>  
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
  },

})
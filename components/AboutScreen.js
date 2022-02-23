import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const img = require("./bg.jpg");

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <Text>Made by Jyri Ruohoniemi</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%', 
    height: '100%',
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default AboutScreen;

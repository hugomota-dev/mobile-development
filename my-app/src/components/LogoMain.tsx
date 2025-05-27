import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";

export default function LogoMain() {
  return (
    <View>
      <Image
        style={styles.mainLogo}
        source={require("../../assets/logo-invenstorage.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainLogo: {
    width: 250,
    height: 250,
  },
});

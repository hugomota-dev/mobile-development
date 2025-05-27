import { View } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";
// imports components
import Login from "../screens/Login";


export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}



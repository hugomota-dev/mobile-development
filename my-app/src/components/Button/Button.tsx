import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export default function Button() {
  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.buttonBox}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
    </View>
  )
}

import { TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
type Props = {
  icon: keyof typeof Feather.glyphMap;
  placeholder: string;
};

export function Input({ icon, placeholder }: Props) {
  return (
    <View style={styles.inputGroup}>
      <View>
        <Feather name={icon} size={24} color={"black"} />
      </View>
      <TextInput style={styles.inputText} placeholder={placeholder}/>
    </View>
  );
}

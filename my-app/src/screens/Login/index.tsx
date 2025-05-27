import { View, Text } from "react-native";
import { styles } from "./styles";
// imports components
import LogoMain from "../../components/LogoMain";
import { Input } from "../../components/Input";
import Button from "../../components/Button/Button";

export default function Login() {
  return (
    <View style={styles.container}>
      <LogoMain />
      <View style={styles.loginBox}>
        <Text style={styles.wellcome}>Faça Login na sua conta</Text>
        <Input icon="user" placeholder="Usuário *" />
        <Input icon="key" placeholder="Senha *" />
      </View>
      <View style={styles.buttonBox}>
        <Button />
      </View>
    </View>
  );
}

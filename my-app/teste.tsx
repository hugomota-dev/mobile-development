import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const hardwarePadrao = [
  { id: "1", nome: "Notebook Dell Latitude", descricao: "Intel i5, 8GB RAM, SSD 256GB" },
  { id: "2", nome: "Mouse Logitech M170", descricao: "Sem fio, USB" },
  { id: "3", nome: "Teclado Mecânico Redragon", descricao: "RGB, Switch Blue" },
  { id: "4", nome: "Monitor LG 24''", descricao: "Full HD, HDMI" },
  { id: "5", nome: "Headset JBL Quantum", descricao: "P2, com microfone" },
  { id: "6", nome: "Switch TP-Link 8 portas", descricao: "10/100Mbps, não gerenciável" },
];

// Tela de Login
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate("Menu");
    } else {
      Alert.alert("Erro", "Usuário ou senha incorretos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Menu
function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Menu Principal</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3b82f6" }]}
        onPress={() => navigation.navigate("Busca")}
      >
        <Text style={styles.buttonText}>Buscar Materiais</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#10b981" }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>Novo Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Cadastro
function CadastroScreen({ navigation }) {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    carregarMateriais();
  }, []);

  const carregarMateriais = async () => {
    const data = await AsyncStorage.getItem("materiais");
    if (data) {
      setMateriais(JSON.parse(data));
    } else {
      await AsyncStorage.setItem("materiais", JSON.stringify(hardwarePadrao));
      setMateriais(hardwarePadrao);
    }
  };

  const adicionarMaterial = async () => {
    if (!nome.trim()) return;
    const novosMateriais = [...materiais, { id: Date.now().toString(), nome, descricao }];
    await AsyncStorage.setItem("materiais", JSON.stringify(novosMateriais));
    setMateriais(novosMateriais);
    setNome("");
    setDescricao("");
    Alert.alert("Sucesso", "Material cadastrado com sucesso!");
  };

  return (
    <View style={styles.scroll}>
      <Text style={styles.sectionTitle}>🆕 Cadastrar Material</Text>
      <TextInput
        style={styles.input}
        placeholder="📄 Nome do material"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="📝 Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#10b981" }]}
        onPress={adicionarMaterial}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Busca
function BuscaScreen({ navigation }) {
  const [materiais, setMateriais] = useState([]);
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    carregarMateriais();
  }, []);

  const carregarMateriais = async () => {
    const data = await AsyncStorage.getItem("materiais");
    if (data) {
      const lista = JSON.parse(data);
      setMateriais(lista);
      setResultado(lista);
    } else {
      await AsyncStorage.setItem("materiais", JSON.stringify(hardwarePadrao));
      setMateriais(hardwarePadrao);
      setResultado(hardwarePadrao);
    }
  };

  const buscarMateriais = () => {
    const filtrados = materiais.filter((item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase())
    );
    setResultado(filtrados);
  };

  const removerMaterial = (id) => {
    Alert.alert("Confirmar", "Deseja remover este material?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          const novosMateriais = materiais.filter((item) => item.id !== id);
          await AsyncStorage.setItem("materiais", JSON.stringify(novosMateriais));
          setMateriais(novosMateriais);
          setResultado(novosMateriais);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <TouchableOpacity onPress={() => removerMaterial(item.id)}>
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardText}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.scroll}>
      <Text style={styles.sectionTitle}>🔍 Buscar Materiais</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite para buscar"
        value={busca}
        onChangeText={setBusca}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3b82f6" }]}
        onPress={buscarMateriais}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#10b981" }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>Novo Cadastro</Text>
      </TouchableOpacity>
      <FlatList
        data={resultado}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3b82f6",
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1d4ed8",
    marginVertical: 10,
    textAlign: "center",
  },
  scroll: {
    paddingHorizontal: 20,
    backgroundColor: "#f9fafb",
    flex: 1,
  },
  input: {
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#111827",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#3b82f6",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0369a1",
  },
  cardText: {
    fontSize: 14,
    color: "#334155",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Busca" component={BuscaScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
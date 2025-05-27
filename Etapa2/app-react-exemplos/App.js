import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TextInput,
	FlatList,
    Alert,
} from "react-native";

//Indicar endereço do backend
const BASE_URL = "http://10.81.205.27:3000";

export default function App() {
	const [counter, setCounter] = useState(0);
	// CRUD em memória
	const [items, setItems] = useState([]);
	const [text, setText] = useState("");
	const [editItemId, setEditItemId] = useState(null);
	const [editItemText, setEditItemText] = useState("");
	const [loading, setLoading] = useState(false);

	const incrementCounter = () => {
		setCounter(counter + 1);
	};

	const decrementCounter = () => {
		setCounter(counter - 1);
	};

	//buscar todos os itens do backend
	const fetchItems = async () => {
		try {
			//executa o que precisa, se der erro entra no catch
			const response = await fetch(`${BASE_URL}/items`);
			const data = await response.json();
			console.log(JSON.stringify(data)); //para ver o que veio do backend
			setItems(data); //atualiza o estado com os itens recebidos
		} catch (error) {
			//quando occorre algum erro
			console.error("Erro ao buscar itens:", error);
		} finally {
			//sempre executa, mesmo se der erro
			setLoading(false);
		}
	}

    // Carregar os itens do backend quando o componente for montado
    useEffect(() => {
        fetchItems();
    }, []);

	//Create
	const addItem = async () => {
		if (text.trim() === "") {
			return;
		}
        try{
            const response = await fetch(`${BASE_URL}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text.trim() }),
            });
            if (response.ok) {
                await fetchItems(); // Atualiza a lista de itens após adicionar
                setText(""); // Limpa o campo de texto
            } else {
                console.error("❌ Erro ao adicionar item:", response.statusText);
            }
        }
        catch (error) {
            console.error("❌ Erro ao adicionar item:", error);
            return;
        }

		const newItem = {
			id: Math.random().toString(),
			text: text.trim(),
		};
		setItems([...items, newItem]);
		setText("");
		console.log(items);
	};

	// Update
	const updateItem = async (id) => {
		try {
            const response = await fetch(`${BASE_URL}/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: editItemText }),
            });
            if (response.ok) {
                await fetchItems(); // Atualiza a lista de itens após editar
                setEditItemId(null); // Limpa o ID do item em edição
                setEditItemText(""); // Limpa o campo de texto de edição
            } else {
                console.error("❌ Erro ao atualizar item:", response.statusText);
            }
        } catch (error) {
            console.error("❌ Erro ao atualizar item:", error);
        }

		setEditItemId(null);
		setEditItemText("");
	};

	// Delete
	const deleteItem = (id) => {
		Alert.alert(
            "Confirmar Exclusão",
            "Do you really want to delete this item? 🥺",
            [
                {
                    text: "Cancel ❤️‍🩹",
                    style: "cancel",
                },
                {
                    text: "Delete 💔",
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/items/${id}`, {
                                method: 'DELETE',
                            });
                            if (response.ok) {
                                await fetchItems(); // Atualiza a lista de itens após excluir
                            } else {
                                console.error("❌ Erro ao excluir item:", response.statusText);
                            }
                        } catch (error) {
                            console.error("❌ Erro ao excluir item:", error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
	};

	// Read -> um unico item e/ou lista de itens
	const renderItem = ({ item }) => {
		if (item.id != editItemId) {
			return (
				<View style={styles.item}>
					<Text style={styles.itemText}>{item.text}</Text>
					<View style={styles.buttons}>
						<Button
							title="Edit"
							onPress={() => {
								setEditItemId(item.id);
							}}
							color={"orange"}></Button>
						<Button
							title="Delete"
							onPress={() => deleteItem(item.id)}
							color={"orange"}></Button>
					</View>
				</View>
			);
		} else {
			// Um item está sendo editado
			return (
				<View style={styles.item}>
					<TextInput
						style={styles.editInput}
						onChangeText={setEditItemText}
						value={editItemText}
						autoFocus
					/>
					<Button
						title="Update"
						onPress={() => updateItem(item.id)}
						color={"orange"}></Button>
				</View>
			);
		}
	};

	return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter text item"
                />
                <Button title="Add Item" onPress={addItem} color={'orange'} />
                <FlatList
                    data={items}
                    renderItem={renderItem} // cada item da lista (items) vai ser processado
                    keyExtractor={(item) => item.id} // retorna o id do item
                    style={styles.list}
                />
                <Text style={styles.text}>Lista de itens com Fetch</Text>
                <Image
                    source={{ uri: 'https://picsum.photos/200' }}
                    style={{ width: 200, height: 200 }}
                />
    
                <StatusBar style="auto" />
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
        padding: 20,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'cursive',
    },
    buttonContainer: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    itemText: {
        flex: 1,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    editInput: {
        flex: 1,
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

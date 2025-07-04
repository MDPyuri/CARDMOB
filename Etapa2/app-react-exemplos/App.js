import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TextInput,
    Alert,
    Image,
} from 'react-native';

// Indicar endereço do backend
const BASE_URL = 'http://MeuIP:5000';

export default function App() {
    const [compras, setCompras] = useState([]); // Lista de compras do backend
    const [newItem, setNewItem] = useState(''); // Novo item para adicionar
    const [newDescricao, setNewDescricao] = useState(''); // Nova descrição para adicionar
    const [newQuantidade, setNewQuantidade] = useState(''); // Nova quantidade para adicionar
    const [editingId, setEditingId] = useState(null); // ID do item em edição
    const [editingText, setEditingText] = useState(''); // Texto do item em edição
    const [editingDescricao, setEditingDescricao] = useState(''); // Descrição do item em edição
    const [editingQuantidade, setEditingQuantidade] = useState(''); // Quantidade do item em edição

    // Buscar todos os itens da tabela de compras no backend
    const fetchCompras = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/catalog`);
            const data = await response.json();
            setCompras(data.catalog); // Atualiza o estado com os itens recebidos
        } catch (error) {
            console.error('Erro ao buscar compras:', error);
        }
    };

    // Carregar os itens da tabela de compras quando o componente for montado
    useEffect(() => {
        fetchCompras();
    }, []);

    // Adicionar um novo item
    const addCompra = async () => {
        if (
            newItem.trim() === '' ||
            newDescricao.trim() === '' ||
            newQuantidade.trim() === ''
        ) {
            Alert.alert(
                'Erro',
                'O nome, a descrição e o preço do item são obrigatórios.'
            );
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/catalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newItem,
                    description: newDescricao,
                    price: parseFloat(newQuantidade),
                    enabled: true,
                }),
            });
            if (response.ok) {
                await fetchCompras(); // Atualiza a lista após adicionar
                setNewItem(''); // Limpa o campo de texto
                setNewDescricao(''); // Limpa o campo de descrição
                setNewQuantidade(''); // Limpa o campo de quantidade
                Alert.alert('Sucesso', 'Item adicionado com sucesso!');
            } else {
                const errorData = await response.json();
                console.error('Erro ao adicionar item:', response.statusText);
                Alert.alert('Erro', 'Erro ao adicionar item. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            Alert.alert('Erro', 'Erro de conexão. Verifique sua internet.');
        }
    };

    // Editar um item
    const saveEdit = async (id) => {
        if (
            editingText.trim() === '' ||
            editingDescricao.trim() === '' ||
            editingQuantidade.trim() === ''
        ) {
            Alert.alert(
                'Erro',
                'O nome, a descrição e o preço do item são obrigatórios.'
            );
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editingText,
                    description: editingDescricao,
                    price: parseFloat(editingQuantidade),
                }),
            });
            if (response.ok) {
                await fetchCompras(); // Atualiza a lista após editar
                setEditingId(null); // Limpa o ID do item em edição
                setEditingText(''); // Limpa o campo de texto de edição
                setEditingDescricao(''); // Limpa o campo de descrição de edição
                setEditingQuantidade(''); // Limpa o campo de quantidade de edição
                Alert.alert('Sucesso', 'Item editado com sucesso!');
            } else {
                const errorData = await response.json();
                console.error('❌ Erro ao editar item:', response.statusText);
                Alert.alert('Erro', 'Erro ao editar item. Tente novamente.');
            }
        } catch (error) {
            console.error('❌ Erro ao editar item:', error);
            Alert.alert('Erro', 'Erro de conexão. Verifique sua internet.');
        }
    };

    // Excluir um item
    const deleteCompra = (id) => {
        Alert.alert(
            'Confirmar Exclusão 💔',
            'Você realmente deseja excluir este item? 🥺',
            [
                {
                    text: 'Cancelar ❤️‍🩹',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            const response = await fetch(
                                `${BASE_URL}/api/catalog/${id}`,
                                {
                                    method: 'DELETE',
                                }
                            );
                            if (response.ok || response.status === 204) {
                                await fetchCompras(); // Atualiza a lista após excluir
                                Alert.alert(
                                    'Sucesso',
                                    'Item excluído com sucesso!'
                                );
                            } else {
                                console.error(
                                    '❌ Erro ao excluir item:',
                                    response.statusText
                                );
                                Alert.alert(
                                    'Erro',
                                    'Erro ao excluir item. Tente novamente.'
                                );
                            }
                        } catch (error) {
                            console.error('❌ Erro ao excluir item:', error);
                            Alert.alert(
                                'Erro',
                                'Erro de conexão. Verifique sua internet.'
                            );
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    // Renderizar cada item
    const renderCompra = ({ item }) => (
        <View style={styles.item}>
            {editingId === item.id ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.editInput}
                        value={editingText}
                        onChangeText={setEditingText}
                        placeholder="Editar Nome"
                    />
                    <TextInput
                        style={styles.editInput}
                        value={editingDescricao}
                        onChangeText={setEditingDescricao}
                        placeholder="Editar Descrição"
                    />
                    <TextInput
                        style={styles.editInput}
                        value={editingQuantidade}
                        onChangeText={setEditingQuantidade}
                        placeholder="Editar Preço"
                        keyboardType="numeric"
                    />
                    <View style={styles.editButtons}>
                        <Button
                            title="Salvar"
                            onPress={() => saveEdit(item.id)}
                            color={'blue'}
                        />
                        <Button
                            title="Cancelar"
                            onPress={() => setEditingId(null)}
                            color={'gray'}
                        />
                    </View>
                </View>
            ) : (
                <>
                    {item.image && (
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    )}
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemDesc}>{item.description}</Text>
                        <Text style={styles.itemPrice}>
                            Preço: R$ {item.price.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            title="Editar"
                            onPress={() => {
                                setEditingId(item.id);
                                setEditingText(item.name);
                                setEditingDescricao(item.description || '');
                                setEditingQuantidade(item.price.toString());
                            }}
                            color={'orange'}
                        />
                        <Button
                            title="Excluir"
                            onPress={() => deleteCompra(item.id)}
                            color={'orange'}
                        />
                    </View>
                </>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lista de Produtos</Text>
            <TextInput
                style={styles.input}
                value={newItem}
                onChangeText={setNewItem}
                placeholder="Adicionar Nome"
            />
            <TextInput
                style={styles.input}
                value={newDescricao}
                onChangeText={setNewDescricao}
                placeholder="Adicionar Descrição"
            />
            <TextInput
                style={styles.input}
                value={newQuantidade}
                onChangeText={setNewQuantidade}
                placeholder="Adicionar Preço"
                keyboardType="numeric"
            />
            <Button title="Adicionar" onPress={addCompra} color={'orange'} />
            <FlatList
                data={compras}
                renderItem={renderCompra}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
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
        marginBottom: 20,
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        minHeight: 80,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
        marginRight: 10,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDesc: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    itemPrice: {
        fontWeight: 'bold',
        color: '#333',
    },
    buttons: {
        flexDirection: 'row',
        gap: 10,
    },
    editContainer: {
        flex: 1,
        width: '100%',
    },
    editInput: {
        height: 40,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    editButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

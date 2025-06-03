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
} from 'react-native';

// Indicar endereço do backend
const BASE_URL = 'http://10.81.205.27:3000';

export default function App() {
    const [compras, setCompras] = useState([]); // Lista de compras do backend
    const [newItem, setNewItem] = useState(''); // Novo item para adicionar
    const [newQuantidade, setNewQuantidade] = useState(''); // Nova quantidade para adicionar
    const [editingId, setEditingId] = useState(null); // ID do item em edição
    const [editingText, setEditingText] = useState(''); // Texto do item em edição
    const [editingQuantidade, setEditingQuantidade] = useState(''); // Quantidade do item em edição

    // Buscar todos os itens da tabela de compras no backend
    const fetchCompras = async () => {
        try {
            const response = await fetch(`${BASE_URL}/compras`);
            const data = await response.json();
            setCompras(data); // Atualiza o estado com os itens recebidos
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
        if (newItem.trim() === '' || newQuantidade.trim() === '') {
            Alert.alert(
                'Erro',
                'O nome e a quantidade do item são obrigatórios.'
            );
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/compras`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item: newItem,
                    quantidade: parseInt(newQuantidade, 10),
                }),
            });
            if (response.ok) {
                await fetchCompras(); // Atualiza a lista após adicionar
                setNewItem(''); // Limpa o campo de texto
                setNewQuantidade(''); // Limpa o campo de quantidade
            } else {
                console.error('Erro ao adicionar item:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    };

    // Editar um item
    const saveEdit = async (id) => {
        if (editingText.trim() === '' || editingQuantidade.trim() === '') {
            Alert.alert(
                'Erro',
                'O nome e a quantidade do item são obrigatórios.'
            );
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item: editingText,
                    quantidade: parseInt(editingQuantidade, 10),
                }),
            });
            if (response.ok) {
                await fetchCompras(); // Atualiza a lista após editar
                setEditingId(null); // Limpa o ID do item em edição
                setEditingText(''); // Limpa o campo de texto de edição
                setEditingQuantidade(''); // Limpa o campo de quantidade de edição
            } else {
                console.error('❌ Erro ao editar item:', response.statusText);
            }
        } catch (error) {
            console.error(' ❌Erro ao editar item:', error);
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
                                `${BASE_URL}/compras/${id}`,
                                {
                                    method: 'DELETE',
                                }
                            );
                            if (response.ok) {
                                await fetchCompras(); // Atualiza a lista após excluir
                            } else {
                                console.error(
                                    '❌ Erro ao excluir item:',
                                    response.statusText
                                );
                            }
                        } catch (error) {
                            console.error('❌ Erro ao excluir item:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    // Incrementar a quantidade de um item
    const incrementQuantity = async (id) => {
        const updatedCompras = compras.map((compra) =>
            compra.id === id
                ? { ...compra, quantidade: compra.quantidade + 1 }
                : compra
        );
        setCompras(updatedCompras);

        try {
            await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantidade: updatedCompras.find(
                        (compra) => compra.id === id
                    ).quantidade,
                }),
            });
        } catch (error) {
            console.error('❌ Erro ao atualizar quantidade:', error);
        }
    };

    // Decrementar a quantidade de um item
    const decrementQuantity = async (id) => {
        const updatedCompras = compras.map((compra) =>
            compra.id === id && compra.quantidade > 0
                ? { ...compra, quantidade: compra.quantidade - 1 }
                : compra
        );
        setCompras(updatedCompras);

        try {
            await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantidade: updatedCompras.find(
                        (compra) => compra.id === id
                    ).quantidade,
                }),
            });
        } catch (error) {
            console.error('❌ Erro ao atualizar quantidade:', error);
        }
    };

    // Renderizar cada item
    const renderCompra = ({ item }) => (
        <View style={styles.item}>
            {editingId === item.id ? (
                <>
                    <TextInput
                        style={styles.editInput}
                        value={editingText}
                        onChangeText={setEditingText}
                        placeholder="Editar Nome"
                    />
                    <TextInput
                        style={styles.editInput}
                        value={editingQuantidade}
                        onChangeText={setEditingQuantidade}
                        placeholder="Editar Quantidade"
                    />
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
                </>
            ) : (
                <>
                    <Text style={styles.itemText}>
                        {item.item} - Quantidade: {item.quantidade}
                    </Text>
                    <View style={styles.buttons}>
                        <Button
                            title="+"
                            onPress={() => incrementQuantity(item.id)}
                            color={'green'}
                        />
                        <Button
                            title="-"
                            onPress={() => decrementQuantity(item.id)}
                            color={'red'}
                        />
                        <Button
                            title="Editar"
                            onPress={() => {
                                setEditingId(item.id);
                                setEditingText(item.item);
                                setEditingQuantidade(
                                    item.quantidade.toString()
                                );
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
            <Text style={styles.text}>Lista de Compras</Text>
            <TextInput
                style={styles.input}
                value={newItem}
                onChangeText={setNewItem}
                placeholder="Adicionar Nome"
            />
            <TextInput
                style={styles.input}
                value={newQuantidade}
                onChangeText={setNewQuantidade}
                placeholder="Adicionar Quantidade"
                keyboardType="numeric"
            />
            <Button title="Adicionar" onPress={addCompra} color={'orange'} />
            <FlatList
                data={compras}
                renderItem={renderCompra}
                keyExtractor={(item) => item.id}
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
        gap: 10,
    },
    editInput: {
        flex: 1,
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

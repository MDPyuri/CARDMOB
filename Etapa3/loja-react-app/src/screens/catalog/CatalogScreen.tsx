import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import CatalogCard from './CatalogCard';

//Todo: importar o serviço de recuperação do catalog
import { getCatalog } from '../../services/catalogService';

import { useShop } from '../../contexts/ShopContext';

const CatalogScreen = ({ navigation }: any) => {
    const [catalog, setCatalog] = useState<any[]>([]);

    const { cartItems, addToCart } = useShop();

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const data = await getCatalog();
                setCatalog(data);
            } catch (error) {
                console.error('Erro ao buscar o catálogo:', error);
            }
        };
        fetchCatalog();
        console.log(catalog);
    }, []);

    const handleBuyPress = (product: any) => {
        // 1 - Adicionar ao carrinho
        // 2 - Navegar para a tela de carrinho
        addToCart(product);
        console.log(product);
    };

    const renderItem = ({ item }: any) => (
        <CatalogCard product={item} onBuyPress={() => handleBuyPress(item)} />
    );

    return (
        <View style={styles.container}>
            <Text>Menu</Text>
            <FlatList
                data={catalog}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    );
};

export default CatalogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
});

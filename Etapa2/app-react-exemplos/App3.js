import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
} from 'react-native';
import List from './components/List';
import Inputs from './components/inputs';

export default function App() {

    return (
        <View style={styles.container}>
            <Inputs/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffe4c4',
        height: '100%',
        paddingTop: 100,
        paddingBottom: 50,
    },
});
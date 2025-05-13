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

export default function App() {

    return (
        <View style={styles.container}>
            <List/>
            <View style={styles.brownbox}></View>
            <View style={styles.chocolatebox}></View>
            <View style={styles.burlybox}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'darkgray',
        height: '100%',
        paddingTop: 50,
        paddingBottom: 50,
    },
    brownbox: {
        backgroundColor: '#8B4513',
        width: 150,
        height: 150,
        borderRadius: 15,
    },
    chocolatebox: {
        backgroundColor: '#D2691E',
        width: 150,
        height: 150,
        borderRadius: 15,
    },
    burlybox: {
        backgroundColor: '#deb887',
        width: 150,
        height: 150,
        borderRadius: 15,
    },
});
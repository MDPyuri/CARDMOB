import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

class List extends Component {
    state = {
        names: [
            { id: 0, name: 'Ben' },
            { id: 1, name: 'Susan' },
            { id: 2, name: 'Roberth' },
            { id: 3, name: 'Chrischarles' },
        ],
    };
    alertItemName = (item) => {
        alert(item.name);
    }

    render() {
        return (
            <View>
                <Text style={styles.textTitle}>
                    Lista de itens "clicáveis"
                </Text>
                {this.state.names.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => this.alertItemName(item)}
                        style={styles.container}
                    >
                        <Text style={styles.textTouchable}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

export default List;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: "#D2691E",
        alignItems: "center",
    },
    textTitle: {
        color: "saddlebrown",
        fontWeight: "bold",
    },
    textTouchable: {
        color: "beige"
    }
});
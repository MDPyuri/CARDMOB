import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 200, height: 200 }}
      />

      <StatusBar style="auto" />
      <Text style={styles.text}>Counter: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={incrementCounter} />
        <Button title="Decrement" onPress={decrementCounter} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "cursive",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

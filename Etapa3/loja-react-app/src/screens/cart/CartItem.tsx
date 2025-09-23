import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

const CartItem = ({ item }: any) => {
  //Para fazer: implementar o context para persistir dados do carrinho

  const handleRemove = () => {
    console.log('item excluído');
  }

  return (
      <View style={styles.container}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.quantity}>
                  <Text style={styles.price}>
                      R$ {(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <TouchableOpacity
                      onPress={() => handleRemove()}
                      style={styles.button}
                  >
                      <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity
                      onPress={() => handleRemove()}
                      style={styles.button}
                  >
                      <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => handleRemove()}
                      style={styles.button}
                  >
                      <FontAwesome name="remove" size={24} color='red' />
                  </TouchableOpacity>
              </View>
          </View>
      </View>
  );

}
export default CartItem;

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },
  image: {
      width: '50%',
      height: 100,
      borderRadius: 8,
      borderColor: '#ddd',
  },
  name: {},
  price: {},
  quantity: {},
  button: {},
  buttonText: {},
  quantityValue: {},
});
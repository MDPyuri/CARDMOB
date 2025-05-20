import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

class ScrollViewExample extends Component {
    state = {
      names: [
        {'name': 'Shelly', 'id': 1},
        {'name': 'Jessie', 'id': 2},
        {'name': 'Penny', 'id': 3},
        {'name': 'Pam', 'id': 4},
        {'name': 'Jacky', 'id': 5},
        {'name': 'Carl', 'id': 6},
        {'name': 'Darryl', 'id': 7},
        {'name': 'Frank', 'id': 8},
        {'name': 'Nita', 'id': 9},
        {'name': 'Bull', 'id': 10},
        {'name': 'El Primo', 'id': 11},
        {'name': 'Spike', 'id': 12}
      ]
    }

    render() {
      return (
        <View>
          <ScrollView>
            {
              this.state.names.map((item, index) => (
                <View
                  key={item.id}
                  style={styles.item}
                >
                  <Image source={require('../assets/LogoBrawl.png')} style={styles.imagem} />
                  <Text>{item.name}</Text>

                </View>
              ))
            }
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#ffa500'
  },
  imagem: {
    width: 70,
    height: 70,
  }
});

export default ScrollViewExample; 
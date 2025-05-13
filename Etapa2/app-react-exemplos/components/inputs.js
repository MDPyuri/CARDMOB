import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

class Inputs extends Component {
  
  state = {
    email: '',
    password: '',
  }
  handleEmail = (text) => {
    this.setState({ email: text });
  }
  handlePassword = (text) => {
    this.setState({ password: text });
  }
  login = (email, pass) => {
    alert(`email: ${email} password: ${pass}`);
  }
  
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder="Email"
          placeholderTextColor={'#8b4513'}
          autoCapitalize='none'
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder="Password"
          placeholderTextColor={'#8b4513'}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => this.login(
              this.state.email, 
              this.state.password
            )
          }
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          
      </View>
    )
  }
}

export default Inputs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#d2691e',
    borderWidth: 1,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: '#d2691e',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color:'white',
    textAlign:'center'
  }
});
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';

class AddContact extends Component {
  constructor() {
    super();
    //cria uma referência para a coleção do Firestore
    this.dbRef = firebase.firestore().collection('contacts');

    //estruturação do state
    this.state = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      isLoading: false
    };
  }

  //atualiza o estado da propriedade sempre que o usuário insere um valor no campo
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  
  insertContact() {
    //valida os campos obrigatórios
    if(this.state.name === ''){
     alert('Name is required!')
    } 
    else if(this.state.phone === ''){
      alert('Phone is required!')
     } 
    else {
      this.setState({
        isLoading: true,
      });      
      //Grava o registro no banco
      this.dbRef.add({
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        phone: this.state.phone,
      }).then((res) => {
        this.setState({
          name: '',
          surname: '',
          email: '',
          phone: '',
          isLoading: false,
        });
        //direciona para tela de listagem de contatos
        this.props.navigation.navigate('ContactList')
      })
      .catch((err) => {
        console.error("Error: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    //mostra um spinner
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9B385B"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Surname'}
              value={this.state.surname}
              onChangeText={(val) => this.inputValueUpdate(val, 'surname')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Phone'}
              value={this.state.phone}
              onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
              keyboardType="numeric"
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Contact'
            onPress={() => this.insertContact()} 
            color="#4CAF50"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddContact;
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';

class ContactDetail extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      email: '',
      phone: '',
      isLoading: true
    };
  }

  //função executada depois que um componente é montado
  componentDidMount() {
    const dbRef = firebase.firestore().collection('contacts').doc(this.props.route.params.contactkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const contact = res.data();
        this.setState({
          key: res.id,
          name: contact.name,
          surname: contact.surname,
          email: contact.email,
          phone: contact.phone,
          isLoading: false
        });
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateContact() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('contacts').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      phone: this.state.phone,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ContactList');
    })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteContact() {
    const dbRef = firebase.firestore().collection('contacts').doc(this.props.route.params.contactkey)
    dbRef.delete().then((res) => {
      this.props.navigation.navigate('ContactList');
    })
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete contact',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteContact() },
        { text: 'No', style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  render() {
    //mostra um spinner
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9B385B" />
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
        <View style={styles.containerButton}>
          <View style={styles.insideButtonContainer}>
            <Button
              title='Update'
              onPress={() => this.updateContact()}
              color="#4CAF50"
            />
          </View>
          <View style={styles.insideButtonContainer}>
            <Button
              title='Delete'
              onPress={this.confirmDelete}
              color="#B4232D"
            />
          </View>
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
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideButtonContainer: {
    flex: 1,
    marginRight: 5
  }
})

export default ContactDetail;
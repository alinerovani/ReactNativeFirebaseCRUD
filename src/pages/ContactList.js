import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/EvilIcons';

class ContactList extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('contacts');
    this.state = {
      isLoading: true,
      contactArr: []
    };
  }

  //função executada depois que um componente é montado
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const contactArr = [];
    querySnapshot.forEach((res) => {
      const { name, surname, email, phone } = res.data();
      contactArr.push({
        key: res.id,
        res,
        name,
        surname,
        email,
        phone,
      });
    });
    this.setState({
      contactArr,
      isLoading: false,
    });
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
        {
          this.state.contactArr.map((item, i) => {
            return (
              <ListItem onPress={() => {
                this.props.navigation.navigate('ContactDetail', {
                  contactkey: item.key
                });
              }} key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          })
        }

        <TouchableOpacity
          style={styles.touchableOpacityStyle}
          activeOpacity={0.7}
          onPress={() => {
            this.props.navigation.navigate('AddContact');
          }}
        >
          <Icon name="plus" size={50} color="#9B385B" />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
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
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 0,
  },
})

export default ContactList;
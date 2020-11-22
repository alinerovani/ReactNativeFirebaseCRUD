import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddContact from './src/pages/AddContact';
import ContactList from './src/pages/ContactList';
import ContactDetail from './src/pages/ContactDetail';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9B385B'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
         marginBottom: 20,
        },
        headerBackTitleStyle: {
          marginBottom: 20,
        }
      }}
    >

      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{ title: 'Contact List' }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{ title: 'Add Contact' }}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{ title: 'Contact Detail' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import UserListScreen from './screens/UserList';
import UserDetailsScreen from './screens/UserDetails';
import AddUserScreen from './screens/AddUser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UsersListStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={UserListScreen}/>
      <Stack.Screen name="Details" component={UserDetailsScreen}/>
    </Stack.Navigator>
  );
}

function AddUserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={AddUserScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="User Management"
          component={UsersListStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color}/>
            ),
          }}
        />
        <Tab.Screen
          name="Add User"
          component={AddUserStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-add-outline" size={size} color={color}/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

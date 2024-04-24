import React, { useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import UserListScreen from './screens/UserList';
import UserDetailsScreen from './screens/UserDetails';
import AddUserScreen from './screens/AddUser';

import { Provider } from 'react-redux';
import store from './store';
import { firebase } from '@react-native-firebase/messaging';

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

  // Permission for notifications
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  // Manage push notifications
  useEffect(() => {
    const getFcmToken = async () => {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken)
      } else {
        console.log("FcmToken not found")
      }
    };
    getFcmToken();

    firebase.messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log("Notification cause app to open from background state:", remoteMessage.notification);
    })
  
    firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  
    const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
  }, [])

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

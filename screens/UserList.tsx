import React from 'react';
import { TouchableOpacity, ScrollView, SafeAreaView, Text, Alert, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import styles from '../lib/Styles';
import { User } from '../lib/Types';

export default function UserListScreen() {
  const navigation = useNavigation();
  const newUser = useSelector((state: any) => state.newUser);

  const userList: User[] = [
    { id: 1, name: 'Johndfsf Doedfgdfg', email: 'john@test.com', role: 'Admin', phone: '4376665544', age: 21  },
    { id: 2, name: 'Jane Green', email: 'jane@test.com', role: 'User', phone: '4376665545', age: 22 },
    { id: 3, name: 'Sam Green', email: 'sam@test.com', role: 'Viewer', phone: '4376665546', age: 23 },
  ];

  const deleteUser = (userId: number) => {
    console.log('Deleted user with ID:', userId);
  };

  const handleDelete = (userId: number, userName: string) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure to delete ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteUser(userId) },
      ]
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {userList.map((user) => (
          // @ts-ignore
          <TouchableOpacity key={user.id} onPress={() => {navigation.navigate('Details', { user });}}>
            <Card style={styles.card}>
              {newUser.id === user.id && (
                <Text style={styles.statusTitle}>New</Text>
              )}
              <Ionicons
                name="trash-outline"
                color="red"
                size={28}
                style={styles.deleteButton}
                onPress={() => handleDelete(user.id, user.name)}
              />
              <Card.Content>
                <Text style={styles.title}>{user.name}</Text>
                <Text>{user.email}</Text>
                <Text>{user.role}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
        <View style={styles.verticalSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

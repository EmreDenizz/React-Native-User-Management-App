import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, SafeAreaView, Text, Alert, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import styles from '../lib/Styles';
import { User } from '../lib/Types';

export default function UserListScreen() {
  const [userList, setUserList] = useState<User[] | []>([]);
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  const navigation = useNavigation();

  const newUser = useSelector((state: any) => state.newUser);

  // API URL
  const apiUrl = "http://127.0.0.1:3000";

  // Get all patients from API
  const getUsersFromAPI = async() => {
    await fetch(apiUrl+"/users").
      then((response) => response.json()).
      then((json) => {
        setUserList(json.reverse());
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const deleteUser = (id: number) => {
    fetch(apiUrl+'/users/'+id, {method:"DELETE"})
      .then(data => {
        setIsMsgVisible(true);
        getUsersFromAPI();
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleDelete = (id: number, userName: string) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure to delete ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteUser(id) },
      ]
    );
  };

  // Fetch users from API when focus
  useFocusEffect(
    React.useCallback(() => {
      getUsersFromAPI();
    }, [])
  );

  useEffect(() => {
    setTimeout(() => {
      setIsMsgVisible(false);
    }, 2000);
  }, [isMsgVisible])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {isMsgVisible && <Text style={styles.successMsg}>User deleted succesfully.</Text>}
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
                size={35}
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

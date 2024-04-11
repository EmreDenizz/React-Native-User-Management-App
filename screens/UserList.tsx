/**
 * @author Emre Deniz
 * @date April, 2024
 */

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Text, Alert, View, Modal } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { User } from '../lib/Types';
import styles from '../lib/Styles';
import UserAvatar  from '../lib/UserAvatar';

export default function UserListScreen() {
  const [userList, setUserList] = useState<User[] | []>([]);
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  const navigation = useNavigation();

  // new user info from redux store
  const newUser = useSelector((state: any) => state.newUser);

  // API URL
  const apiUrl = "http://127.0.0.1:3000";

  // Get all users from API
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

  // Delete user from API
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

  // Handle delete function for each user
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

  // Hide success message
  useEffect(() => {
    setTimeout(() => {
      setIsMsgVisible(false);
    }, 1500);
  }, [isMsgVisible])

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* User list */}
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
              <View style={{flex: 1, flexDirection: "row"}}>
                <UserAvatar name={user.name} />
                <View>
                  <Text style={styles.title}>{user.name}</Text>
                  <Text>{user.email}</Text>
                  <Text>{user.role}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}

      {/* Success message modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMsgVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalTextView}>
            <Text style={styles.modalText}>User deleted succesfully.</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.verticalSpace} />
    </ScrollView>
  );
}

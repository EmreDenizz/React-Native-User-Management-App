// Import the necessary components and hooks
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Text, Alert, View, Modal } from 'react-native';
import TextInput from "react-native-text-input-interactive";
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { User } from '../lib/Types';
import styles from '../lib/Styles';
import UserAvatar  from '../lib/UserAvatar';

export default function UserListScreen() {
  const [userList, setUserList] = useState<User[] | []>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isMsgVisible, setIsMsgVisible] = useState(false);

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

  // Fetch users from API and reset the search when focus
  useFocusEffect(
    React.useCallback(() => {
      getUsersFromAPI();
      setSearchText('');
    }, [])
  );

  // Hide success message
  useEffect(() => {
    setTimeout(() => {
      setIsMsgVisible(false);
    }, 1500);
  }, [isMsgVisible])

  // Filter user list
  const filteredUserList = userList.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Search input box */}
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchText}
        onChangeText={setSearchText}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        originalColor="#BCB7B7"
      />

      {/* User list */}
      {filteredUserList.map((user) => (
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
              <View style={styles.flexRow}>
                <UserAvatar name={user.name} />
                <View>
                  <Text numberOfLines={2} style={styles.title}>{user.name}</Text>
                  <Text>{user.email}</Text>
                  <Text>{user.role}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      { filteredUserList.length == 0 && <Text>No users found.</Text> }

      {/* Success message modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMsgVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalTextView}>
            <Text style={styles.modalText}>User deleted successfully.</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.verticalSpace} />
    </ScrollView>
  );
}

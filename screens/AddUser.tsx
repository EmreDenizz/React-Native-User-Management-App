/**
 * @author Emre Deniz
 * @date April, 2024
 */

import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import TextInput from "react-native-text-input-interactive";
import Dropdown from 'react-native-input-select';

import styles from '../lib/Styles';
import { ValidateForm } from '../lib/FormValidation';

export default function AddUserScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [role, setRole] = useState('User');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  // API URL
  const apiUrl = "http://127.0.0.1:3000";

  // Handle save
  const handleSave = () => {
    if (ValidateForm(name, email, phone, age)) {

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          role: role,
          phone: phone,
          age: age
        })
      };
      fetch(apiUrl+'/users', options)
        .then(res => res.json())
        .then(data => {
          // redux
          dispatch({
            type: 'NEW_USER',
            payload: {
              id: data.id
            },
          });

          setIsMsgVisible(true);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  };

  // Handle clear
  const handleClear = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPhone("");
    setAge("");
    setRole("User")
  };

  // Handle age change
  const handleAgeInputChange = (text: string) => {
    const numericValue = parseFloat(text);
    setAge(isNaN(numericValue) ? '' : numericValue);
  };

  // Clear input fields when focus
  useFocusEffect(
    React.useCallback(() => {
      handleClear();
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
      
      {/* Form title */}
      <Text style={styles.mainTitle}>Add User Form </Text>

      {/* User name input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name..."
        value={name}
        onChangeText={text => setName(text)}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        originalColor="#BCB7B7"
      />

      {/* User email input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email..."
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        originalColor="#BCB7B7"
      />

      {/* User phone input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Phone (10 digits)..."
        value={phone}
        onChangeText={text => setPhone(text)}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        originalColor="#BCB7B7"
      />

      {/* User age input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Age..."
        value={age === '' ? '' : age.toString()}
        onChangeText={handleAgeInputChange}
        keyboardType="number-pad"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        originalColor="#BCB7B7"
      />

      {/* User role dropdown */}
      <Dropdown
          placeholder="Select a role..."
          options={[
            { label: 'User', value: 'User' },
            { label: 'Viewer', value: 'Viewer' },
            { label: 'Admin', value: 'Admin' },
          ]}
          selectedValue={role}
          onValueChange={(value: string) => setRole(value)}
          primaryColor={'blue'}
          isMultiple={false}
          dropdownStyle={{minHeight: 50}}
      />

      {/* Add button */}
      <TouchableOpacity
          style={styles.buttonSave}
          onPress = {handleSave}>
          <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      {/* Clear button */}
      <TouchableOpacity
          style={styles.buttonClear}
          onPress = {handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>

      {/* Success message modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMsgVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalTextView}>
            <Text style={styles.modalText}>User added succesfully.</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.verticalSpace} />
    </ScrollView>
  );
}

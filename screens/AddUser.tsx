import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Dropdown from 'react-native-input-select';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import styles from '../lib/Styles';
import { ValidateForm } from '../lib/FormValidation';

export default function AddUserScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Viewer');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  // API URL
  const apiUrl = "http://127.0.0.1:3000";

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

      console.log('Form submitted successfully');
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPhone("");
    setAge("");
    setRole("Viewer")
  };

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

  useEffect(() => {
    setTimeout(() => {
      setIsMsgVisible(false);
    }, 2000);
  }, [isMsgVisible])

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {isMsgVisible && <Text style={styles.successMsg}>User added succesfully.</Text>}

      <Text style={styles.mainTitle}>Add User Form </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name..."
        value={name}
        onChangeText={text => setName(text)}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email..."
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phone (10 digits)..."
        value={phone}
        onChangeText={text => setPhone(text)}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Age..."
        value={age === '' ? '' : age.toString()}
        onChangeText={handleAgeInputChange}
        keyboardType="number-pad"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Dropdown
          placeholder="Select a role..."
          options={[
            { label: 'Viewer', value: 'Viewer' },
            { label: 'User', value: 'User' },
            { label: 'Admin', value: 'Admin' },
          ]}
          selectedValue={role}
          onValueChange={(value: string) => setRole(value)}
          primaryColor={'blue'}
          isMultiple={false}
      />

      {/* Add button */}
      <TouchableOpacity
          style={[styles.button, {backgroundColor: 'blue'}]}
          onPress = {handleSave}>
          <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      {/* Clear button */}
      <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress = {handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>

      <View style={styles.verticalSpace} />
    </ScrollView>
  );
}

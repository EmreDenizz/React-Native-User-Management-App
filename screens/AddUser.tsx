import React, { useState } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Dropdown from 'react-native-input-select';

import styles from '../lib/Styles';
import { ValidateForm } from '../lib/FormValidation';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Viewer');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');

  const handleSave = () => {
    if (ValidateForm(name, email, phone, age)) {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

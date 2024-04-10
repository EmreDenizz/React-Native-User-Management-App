import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from 'react-native-input-select';

import styles from '../lib/Styles';
import { User } from '../lib/Types';
import { ValidateForm } from '../lib/FormValidation'

interface UserDetailsProps {
  route: {
    params?: { user?: User; };
  };
}

export default function UserDetailsScreen({ route }: UserDetailsProps) {
  const { user } = route.params || {};

  const [name, setName] = useState(user?.name);
  const [role, setRole] = useState(user?.role);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [age, setAge] = useState<number | ''>(user?.age || '');
  const [nameInput, setNameInput] = useState(user?.name);
  const [roleInput, setRoleInput] = useState(user?.role);
  const [emailInput, setEmailInput] = useState(user?.email);
  const [phoneInput, setPhoneInput] = useState(user?.phone);
  const [ageInput, setAgeInput] = useState<number | ''>(user?.age || '');
  const [isVisible, setIsVisible] = useState(false);
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  // API URL
  const apiUrl = "http://127.0.0.1:3000";

  const handleSave = (id: number) => {
    if (ValidateForm(nameInput || '', emailInput || '', phoneInput || '', ageInput)) {
      // PUT request to API for updating patient
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          name: nameInput,
          email: emailInput,
          role: roleInput,
          phone: phoneInput,
          age: ageInput
        })
      };
      fetch(apiUrl+"/users/"+id, options)
        .then(data => {
          setIsMsgVisible(true);
          setIsVisible(false);

          setName(nameInput);
          setEmail(emailInput);
          setPhone(phoneInput);
          setAge(ageInput);
          setRole(roleInput);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  };

  const handleAgeInputChange = (text: string) => {
    const numericValue = parseFloat(text);
    setAgeInput(isNaN(numericValue) ? '' : numericValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsMsgVisible(false);
    }, 2000);
  }, [isMsgVisible])

  return (
      <ScrollView contentContainerStyle={styles.container2}>
        <View style={styles.secWrapper}>
          <View style={{flex: 1, flexDirection: "row"}}>
            <Ionicons name="person" size={60} />
            <View>
              <Text style={styles.userNameText}>{name}</Text>
              <Text style={styles.roleText}>{role}</Text>
            </View>
          </View>

          <View style={styles.secTextContanier}>
            <Ionicons name="mail-outline" size={30} />
            <Text style={styles.secText}>{email}</Text>
          </View>

          <View style={styles.secTextContanier}>
            <Ionicons name="call-outline" size={30} />
            <Text style={styles.secText}>{phone}</Text>
          </View>

          <View style={styles.secTextContanier}>
            <Ionicons name="calendar-outline" size={30} />
            <Text style={styles.secText}>{age}</Text>
          </View>

          <Ionicons
              name="create-outline"
              color="blue"
              size={35}
              style={styles.editButton}
              onPress={() => {setIsVisible(!isVisible)}}
            />
        </View>

        { isMsgVisible && <Text style={styles.successMsg}>User updated succesfully.</Text> }

        { isVisible && 
        <View>
          <Text style={styles.formTitle}>Update User</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name..."
              value={nameInput}
              onChangeText={text => setNameInput(text)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email..."
              value={emailInput}
              onChangeText={text => setEmailInput(text)}
              keyboardType="email-address"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone (10 digits)..."
              value={phoneInput}
              onChangeText={text => setPhoneInput(text)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Age..."
              value={ageInput === '' ? '' : ageInput.toString()}
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
                selectedValue={roleInput}
                onValueChange={(value: string) => setRoleInput(value)}
                primaryColor={'blue'}
                isMultiple={false}
            />

            {/* Save button */}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: 'blue'}]}
                onPress = { () => handleSave(user?.id || 0) }>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {/* Cancel button */}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: 'red'}]}
                onPress = {() => {setIsVisible(false)}}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.verticalSpace} />
          </View>
        }
      </ScrollView>
  );
};

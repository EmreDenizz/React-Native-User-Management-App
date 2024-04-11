/**
 * @author Emre Deniz
 * @date April, 2024
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, View, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from 'react-native-input-select';
import TextInput from "react-native-text-input-interactive";

import { User } from '../lib/Types';
import { ValidateForm } from '../lib/FormValidation'
import styles from '../lib/Styles';
import UserAvatar  from '../lib/UserAvatar';

// Props
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

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  // API URL
  const apiUrl = "http://127.0.0.1:3000";

  // Handle save
  const handleSave = (id: number) => {
    if (ValidateForm(nameInput || '', emailInput || '', phoneInput || '', ageInput)) {
      // PUT request to API for updating user
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
          setIsFormVisible(false);

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

  // Handle age change
  const handleAgeInputChange = (text: string) => {
    const numericValue = parseFloat(text);
    setAgeInput(isNaN(numericValue) ? '' : numericValue);
  };

  // Hide success message
  useEffect(() => {
    setTimeout(() => {
      setIsMsgVisible(false);
    }, 1500);
  }, [isMsgVisible])

  return (
      <ScrollView contentContainerStyle={styles.container2}>
        <View style={styles.secWrapper}>

          {/* User avatar, name and role */}
          <View style={{flex: 1, flexDirection: "row"}}>
            <UserAvatar name={name || ''} />
            <View>
              <Text style={styles.userNameText}>{name}</Text>
              <Text style={styles.roleText}>{role}</Text>
            </View>
          </View>

          {/* User email */}
          <View style={styles.secTextContanier}>
            <Ionicons name="mail-outline" size={30} />
            <Text style={styles.secText}>{email}</Text>
          </View>

          {/* User phone */}
          <View style={styles.secTextContanier}>
            <Ionicons name="call-outline" size={30} />
            <Text style={styles.secText}>{phone}</Text>
          </View>

          {/* User age */}
          <View style={styles.secTextContanier}>
            <Ionicons name="calendar-outline" size={30} />
            <Text style={styles.secText}>{age}</Text>
          </View>

          {/* Edit icon */}
          <Ionicons
              name="create-outline"
              color="blue"
              size={35}
              style={styles.editButton}
              onPress={() => {setIsFormVisible(!isFormVisible)}}
            />
        </View>

        {/* Edit form */}
        { isFormVisible && 
        <View>
          <Text style={styles.formTitle}>Update User</Text>

            {/* User name input */}
            <TextInput
              style={styles.input}
              placeholder="Enter Name..."
              value={nameInput}
              onChangeText={text => setNameInput(text)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              originalColor="#BCB7B7"
            />

            {/* User email input */}
            <TextInput
              style={styles.input}
              placeholder="Enter Email..."
              value={emailInput}
              onChangeText={text => setEmailInput(text)}
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
              value={phoneInput}
              onChangeText={text => setPhoneInput(text)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              originalColor="#BCB7B7"
            />

            {/* User age input */}
            <TextInput
              style={styles.input}
              placeholder="Enter Age..."
              value={ageInput === '' ? '' : ageInput.toString()}
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
                selectedValue={roleInput}
                onValueChange={(value: string) => setRoleInput(value)}
                primaryColor={'blue'}
                isMultiple={false}
                dropdownStyle={{minHeight: 50}}
            />

            {/* Save button */}
            <TouchableOpacity
                style={styles.buttonSave}
                onPress = { () => handleSave(user?.id || 0) }>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {/* Cancel button */}
            <TouchableOpacity
                style={styles.buttonClear}
                onPress = {() => {setIsFormVisible(false)}}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.verticalSpace} />
          </View>
        }

        {/* Success message modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isMsgVisible}
        >
          <View style={styles.modal}>
            <View style={styles.modalTextView}>
              <Text style={styles.modalText}>User updated successfully.</Text>
            </View>
          </View>
        </Modal>

      </ScrollView>
  );
};

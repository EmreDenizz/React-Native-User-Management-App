/**
 * @author Emre Deniz
 * @date April, 2024
 */

import { Alert } from 'react-native';

export const ValidateForm = (name: string, email: string, phone: string, age: number | '') => {
  if (!name.trim()) {
    Alert.alert('Error', 'Please enter a name.');
    return false;
  }
  if (!isValidEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address.');
    return false;
  }
  if (!isValidPhone(phone)) {
    Alert.alert('Error', 'Please enter a valid phone number.');
    return false;
  }
  if (!age || isNaN(age)) {
    Alert.alert('Error', 'Please enter a valid age.');
    return false;
  }
  return true;
};

const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

const isValidPhone = (phone: string) => {
  return /^\d{10}$/.test(phone);
};

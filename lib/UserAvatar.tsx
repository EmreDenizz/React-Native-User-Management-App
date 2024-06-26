/**
 * @author Emre Deniz
 * @date April, 2024
 */

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../lib/Styles';

// Props
interface Props {
  name: string;
}

const UserAvatar: React.FC<Props> = ({ name }) => {
  // Generate a random backgorund color
  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return '#'+color;
  };

  // Get initials from the user name
  const initials = (name.split(' ')[0][0] + name.split(' ')[name.split(' ').length - 1][0]).toUpperCase();

  return (
    <View style={styles.avatarContainer}>
      <View style={[styles.avatar, { backgroundColor: getRandomColor() }]}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </View>
    </View>
  );
};

export default UserAvatar;

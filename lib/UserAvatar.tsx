import React from 'react';
import { View, Text } from 'react-native';
import styles from '../lib/Styles';

interface Props {
  name: string;
}

const UserAvatar: React.FC<Props> = ({ name }) => {
  // generate a random color
  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return '#'+color;
  };

  // get initials from the name
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.avatarContainer}>
      <View style={[styles.avatar, { backgroundColor: getRandomColor() }]}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </View>
    </View>
  );
};

export default UserAvatar;

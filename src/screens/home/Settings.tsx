import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { removeToken } from '../../utils/server';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList, 'Login'>;

const Settings = () => {
  const navigation = useNavigation<NavigationProps>();

  const onLogout = async () => {
    await removeToken('access');
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onLogout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#3498db',
    borderRadius: 8,
    margin: 16,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Settings;

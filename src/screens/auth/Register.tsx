import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registerUser } from '../../services/auth.service';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList, 'Login'>;

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.users);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProps>();

  const handleRegister = async () => {
    try {
      await dispatch(registerUser({ name, email, phone, password }));

      setName('');
      setEmail('');
      setPhone('');
      setPassword('');

      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
        value={phone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* {error && <Text style={styles.error}>{error}</Text>} */}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  link: {
    marginTop: 16,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default Register;

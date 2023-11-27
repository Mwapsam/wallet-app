import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { loginUser } from '../../services/auth.service';

type RootStackParamList = {
  Register: undefined;
  Home: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList, 'Register' | 'Home'>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    try {
      // Validate the email and password
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      setLoading(true);
      setError(null);

      await dispatch(loginUser({ email, password }));

      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation<NavigationProps>();
  const gotRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.link} onPress={gotRegister}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
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

export default Login;

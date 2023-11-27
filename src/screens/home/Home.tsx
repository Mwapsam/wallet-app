import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  userName: string;
  balance: number;
  onDepositPress: () => void;
  onWithdrawPress: () => void;
};

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Sam!</Text>

      <View style={styles.walletInfo}>
        <Text style={styles.balanceText}>Wallet Balance: $200</Text>
      </View>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Deposit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Withdraw</Text>
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
    fontSize: 20,
    marginBottom: 16,
  },
  walletInfo: {
    marginBottom: 32,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;

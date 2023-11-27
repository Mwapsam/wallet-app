import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenNavigationProp = StackNavigationProp<any, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigation.replace('Register');
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/splash.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import authRoute from '../utils/authRoute';
import { Home, Login, Register, SplashScreen, Settings } from '../screens';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-settings' : 'ios-settings-outline';
        }

        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ tabBarBadge: 3 }} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const Navigators = () => {
  const { loading, error } = useSelector((state: RootState) => state.users);

  const user = authRoute();
  const isLoggedIn =
    user && user.name !== '' && user.email !== '' && user.id !== '';


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'AuthenticatedTabs' : 'Splash'}
        screenOptions={{ headerShown: false }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen
            name="AuthenticatedTabs"
            component={AuthenticatedTabs}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;

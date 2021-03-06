import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes'
import {AuthProvider } from './hooks/AuthContext'

export default function App() {
  const isLoadingComplete = useCachedResources();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
          <StatusBar hidden={true} />
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

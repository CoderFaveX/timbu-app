// app/_layout.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { ProductProvider } from './context/ProductContext';

const RootLayout = () => {
  return (
    <ProductProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </ProductProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default RootLayout;

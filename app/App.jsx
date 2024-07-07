import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Main from './index';

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });
};

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  Font.useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    console.log("Hey not loaded")
    return (
      <AppLoading
        startAsync={() => loadFonts()}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return <Main />;
}

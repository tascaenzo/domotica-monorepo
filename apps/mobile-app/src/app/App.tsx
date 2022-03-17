import React from 'react';
import { useFonts } from 'expo-font';
import Routes from './components/Routes';

export default () => {
  const [loaded] = useFonts({
    OxygenRegular: require('../../assets/fonts/Oxygen-Regular.ttf'),
    OxygenLight: require('../../assets/fonts/Oxygen-Light.ttf'),
    OxygenBold: require('../../assets/fonts/Oxygen-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (<Routes />);
};

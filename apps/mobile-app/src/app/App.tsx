import React from 'react';
import { useFonts } from 'expo-font';
import Routes from './components/Routes';
import { DeviceContext, UseDeviceListener } from './hooks/use-device-context';
import SignIn from './screens/SignIn/SignIn';

export default () => {
  const [loaded] = useFonts({
    OxygenRegular: require('../../assets/fonts/Oxygen-Regular.ttf'),
    OxygenLight: require('../../assets/fonts/Oxygen-Light.ttf'),
    OxygenBold: require('../../assets/fonts/Oxygen-Bold.ttf'),
  });

  const initialState = UseDeviceListener();

  if (!loaded) {
    return null;
  }

  return <SignIn />;

  return (
    <DeviceContext.Provider value={initialState}>
      <Routes />
    </DeviceContext.Provider>
  );
};

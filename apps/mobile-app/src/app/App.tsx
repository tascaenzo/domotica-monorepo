import React from 'react';
import { useFonts } from 'expo-font';
import Routes from './components/Routes';
import { DeviceContext, UseDeviceListener } from './hooks/use-device-context';
import SignIn from './screens/SignIn/SignIn';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from './components/Loader/Loader';

export default () => {
  const { promiseInProgress } = usePromiseTracker();

  const [loaded] = useFonts({
    OxygenRegular: require('../../assets/fonts/Oxygen-Regular.ttf'),
    OxygenLight: require('../../assets/fonts/Oxygen-Light.ttf'),
    OxygenBold: require('../../assets/fonts/Oxygen-Bold.ttf'),
  });

  const initialState = UseDeviceListener();

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Loader isLoading={promiseInProgress} />
      <SignIn />
    </>
  );

  return (
    <DeviceContext.Provider value={initialState}>
      <Loader isLoading={promiseInProgress} />
      <Routes />
    </DeviceContext.Provider>
  );
};

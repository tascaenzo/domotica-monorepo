import React from 'react';
import Loader from './components/Loader/Loader';
import SignIn from './screens/SignIn/SignIn';
import Routes from './components/Routes';

import { useFonts } from 'expo-font';
import { DeviceContext, UseDeviceListener } from './hooks/use-device-context';
import { usePromiseTracker } from 'react-promise-tracker';
import { AuthContext, UseAuthContext } from './hooks/use-auth-context';

export default () => {
  const [loaded] = useFonts({
    OxygenRegular: require('../../assets/fonts/Oxygen-Regular.ttf'),
    OxygenLight: require('../../assets/fonts/Oxygen-Light.ttf'),
    OxygenBold: require('../../assets/fonts/Oxygen-Bold.ttf'),
  });

  const { promiseInProgress } = usePromiseTracker();
  const initialDeviceState = UseDeviceListener();
  const initialAuthState = UseAuthContext();

  if (!loaded) return null;

  return (
    <AuthContext.Provider value={initialAuthState}>
      <DeviceContext.Provider value={initialDeviceState}>
        <Loader isLoading={promiseInProgress} />

        <AuthContext.Consumer>
          {(value) => {
            if (!value?.user) return <SignIn />;
          }}
        </AuthContext.Consumer>

        <Routes />
      </DeviceContext.Provider>
    </AuthContext.Provider>
  );
};

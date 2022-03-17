import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppBar from '../AppBar';
import Home from "../../screens/Home/Home";
import Users from "../../screens/Users/Users";
import NotificationCenter from "../../screens/NotificationCenter/NotificationCenter";

import { RoutesEnum } from "./routes.enum";

const Routes = (): JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AppBar
        drawerOpen={true}
        onPressDrawer={() => null}
      />
      <SafeAreaView
        style={{
          flex: 1,
          padding: 15,
          backgroundColor: '#f4f4f4',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Stack.Navigator
          initialRouteName={RoutesEnum.Home}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={RoutesEnum.Home} component={Home} />
          <Stack.Screen name={RoutesEnum.Users} component={Users} />
          <Stack.Screen name={RoutesEnum.NotificationCenter} component={NotificationCenter} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default Routes;

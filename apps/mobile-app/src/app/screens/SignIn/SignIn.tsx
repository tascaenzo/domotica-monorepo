import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import TextField from '../../components/FormComponent/TextField';
import { styles } from './style';

const SignIn = (): JSX.Element => {
  return (
    <View>
      <View style={styles.circleContainer} />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <Text style={styles.titleLogin}>Login</Text>
      <Text style={styles.titleWelcome}>Benvenuto</Text>

      <SafeAreaView style={styles.container}>
        <TextField />
        <TextField />

      </SafeAreaView>
    </View>
  );
};

export default SignIn;

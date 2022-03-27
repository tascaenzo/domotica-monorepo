import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './style';

const TextField = () => {
  return <TextInput secureTextEntry={true} placeholder='Username' selectionColor="#606060" style={styles.input} />;
};

export default TextField;

import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './style';

interface Props extends TextInputProps {
  icon?: JSX.Element;
  error?: string;
}

const TextField = (props: Props) => {
  return (
    <View style={{ ...styles.container, borderWidth: props.error ? 1 : 0 }}>
      {props.icon && <View style={styles.icon}>{props.icon}</View>}
      <TextInput {...props} selectionColor="#606060" style={styles.input} />
    </View>
  );
};

export default TextField;

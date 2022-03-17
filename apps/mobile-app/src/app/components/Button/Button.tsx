import React from 'react';
import { Text, Pressable } from 'react-native';
import { useStyles } from './style';

interface Props {
  onPress?: () => void,
  title: string,
  color?: string,
  width?: number,
};

const Button = ({ onPress, title, color, width }: Props) => {
  const styles = useStyles({color, width});
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default Button;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStyles } from "./style";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any,
  icon: JSX.Element,
  title: string,
  label: string,
  primaryColor: string,
  secondayColor: string,
  onPress?: () => void,
};

const Card = ({style, icon, title, label, primaryColor, secondayColor, onPress }: Props) => {
  const styles = useStyles({ primaryColor, secondayColor });

  return (
    <TouchableOpacity style={{...style, ...styles.container }} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Card;

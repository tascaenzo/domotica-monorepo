import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './style';
import { Entypo } from '@expo/vector-icons';

interface Props {
  icon: JSX.Element;
  title: string;
  color?: string;
  body?: JSX.Element;
  onOpen: () => void;
  onAction: () => void;
}

const IotCard = ({ icon, title, body, color, onOpen, onAction }: Props) => {
  const styles = useStyles({ color });

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={onAction} style={styles.iconContainer}>
          <View style={styles.icon}>{icon}</View>
        </TouchableOpacity>

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ paddingTop: 8 }}>{body}</View>
        </View>
      </View>
      <TouchableOpacity onPress={onOpen} style={styles.openContainer}>
        <Entypo name="chevron-right" size={26} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default IotCard;

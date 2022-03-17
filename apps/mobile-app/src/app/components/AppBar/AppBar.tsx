import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./style";

interface Props { drawerOpen: boolean, onPressDrawer: () => void };

const AppBar = ({ drawerOpen, onPressDrawer }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <TouchableOpacity style={styles.iconContainer} onPress={onPressDrawer}>
          <Ionicons
            name={drawerOpen ? 'md-apps' : 'ios-arrow-back'}
            size={28}
            color="#737373"
          />
        </TouchableOpacity>
        <Text style={styles.label}>Home</Text>
      </View>
  
      <View style={{ flexDirection: "row", padding: 8 }}>
        <Image style={styles.avatarImg} source={require('../../../assets/avatar.jpeg')} />
      </View>
    </View>
  )
}

export default AppBar;

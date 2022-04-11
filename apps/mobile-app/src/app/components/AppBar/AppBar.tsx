import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { useLinkTo } from '@react-navigation/native';
import { RoutesEnum } from '../Routes';

const AppBar = () => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => linkTo(`/${RoutesEnum.Home}`)}
        >
          <Ionicons name={'md-apps'} size={28} color="#737373" />
        </TouchableOpacity>
        <Text style={styles.label}>Home</Text>
      </View>

      <TouchableOpacity
        onPress={() => linkTo(`/${RoutesEnum.Profile}`)}
        style={{ flexDirection: 'row', padding: 8 }}
      >
        <Image
          style={styles.avatarImg}
          source={require('../../../assets/avatar.jpeg')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;

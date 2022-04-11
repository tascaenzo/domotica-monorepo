import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import { AuthContext } from '../../hooks/use-auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const signOut = async () => {
    await AsyncStorage.removeItem('auth');
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ciao {user?.firstName}</Text>

      <View style={styles.btn}>
        <Button
          onPress={() => null}
          width={'100%'}
          title="Modifica Password"
          color={'#c9c9c9'}
        />
      </View>

      <View style={styles.btn}>
        <Button onPress={signOut} width="100%" title="Esci" color="#eb1717" />
      </View>
    </View>
  );
};

export default Profile;

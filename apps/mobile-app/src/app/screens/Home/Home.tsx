import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card from '../../components/Card/Card';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import IotCard from '../../components/IotCard/IotCard';
import { useLinkTo } from '@react-navigation/native';
import { RoutesEnum } from '../../components/Routes/routes.enum';
import { DeviceContext } from '../../hooks/use-device-context';

const Home = (): JSX.Element => {
  const linkTo = useLinkTo();

  return (
    <View style={{ justifyContent: 'center' }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Card
          style={styles.card}
          primaryColor="#eb7f54"
          secondayColor="#ed976c"
          icon={<Ionicons name="home" size={32} color="#FFF" />}
          label="128 Device"
          title="Casa"
        />
        <Card
          style={styles.card}
          primaryColor="#6e39ef"
          secondayColor="#8353eb"
          icon={<Ionicons name="notifications" size={32} color="#FFF" />}
          label="0 Messaggi"
          title="Notifiche"
          onPress={() => linkTo(`/${RoutesEnum.NotificationCenter}`)}
        />
        <Card
          style={styles.card}
          primaryColor="#5ea150"
          secondayColor="#74ad68"
          icon={<Ionicons name="people" size={32} color="#FFF" />}
          label="1 Utente"
          title="Utenti"
          onPress={() => linkTo(`/${RoutesEnum.Users}`)}
        />
      </ScrollView>

      <Text style={styles.label}>Preferiti</Text>
      <DeviceContext.Consumer>
        {(value) => (
          <IotCard
            onAction={() => null}
            onOpen={() => null}
            title="Energy monitor"
            body={
              <Text>
                {value?.getDevice('621ea83825d92ef1fc474da8')?.deviceId}
              </Text>
            }
            icon={<Ionicons name="people" size={32} color="#FFF" />}
          />
        )}
      </DeviceContext.Consumer>

      <IotCard
        onAction={() => null}
        onOpen={() => null}
        title="test"
        color="#fae5a0"
        icon={<Ionicons name="flash" size={32} color="#FFF" />}
      />
    </View>
  );
};

export default Home;

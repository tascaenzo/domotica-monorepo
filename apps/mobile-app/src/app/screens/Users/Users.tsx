import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "./style";

const Users = (): JSX.Element => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.item}>
          <Image style={styles.avatarImg} source={require('../../../assets/avatar/1.png')} />
          <Text style={styles.label}>Enzo</Text>
        </View>
        <View style={styles.item}>
          <Image style={styles.avatarImg} source={require('../../../assets/avatar/1.png')} />
          <Text style={styles.label}>Alessandra</Text>
        </View>
        <View style={styles.item}>
          <Image style={styles.avatarImg} source={require('../../../assets/avatar/2.png')} />
          <Text style={styles.label}>Noemi</Text>
        </View>
        <View style={styles.item}>
          <Image style={styles.avatarImg} source={require('../../../assets/avatar/4.png')} />
          <Text style={styles.label}>Salvo</Text>
        </View>
        <View style={styles.item}>
          <Image style={styles.avatarImg} source={require('../../../assets/avatar/1.png')} />
          <Text style={styles.label}>Nuccia</Text>
        </View>
        <View style={styles.item} />
      </View>
    </ScrollView>
  )
}

export default Users;

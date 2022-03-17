import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import { styles } from "./style";

enum PUSH_TAB { READ, UNREAD }

const NotificationCenter = () => {
  const [tab, setTab] = useState(PUSH_TAB.UNREAD);

  return (
    <View>
      <View style={styles.tabContainer}>
        <Button
          onPress={() => setTab(PUSH_TAB.UNREAD)}
          width={140}
          title="Nuove"
          color={tab === PUSH_TAB.UNREAD ? '#6e39ef' : '#c9c9c9'}
        />
        <Button
          onPress={() => setTab(PUSH_TAB.READ)}
          width={140}
          title="Archiviate"
          color={tab === PUSH_TAB.READ ? '#6e39ef' : '#c9c9c9'}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.pushContainer}>

          </View>
          <View style={styles.pushContainer}></View>
          <View style={styles.pushContainer}></View>
          <View style={styles.pushContainer}></View>
          <View style={styles.pushContainer}></View>
        </View>
      </ScrollView>
    </View>
  )
}

export default NotificationCenter;

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: "row",
    flexWrap: 'wrap',
  },

  item:{
    alignItems: 'center',
    height: 150,
    width: 150,
    margin: 15,
  },

  avatarImg: {
    height: 120,
    width: 120,
  },

  label: {
    padding: 8,
    fontFamily: 'OxygenLight',
    fontSize: 18
  }
});

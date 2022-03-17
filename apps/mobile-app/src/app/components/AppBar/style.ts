import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: "row",
    padding: 18,
    paddingTop: 42,
  },

  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f7f7f7',
  },

  label: {
    paddingTop: 9,
    fontFamily: "OxygenBold",
    fontSize: 22,
    color: "#737373",
  },

  avatarImg: {
    height: 50,
    width: 50,
  }
});

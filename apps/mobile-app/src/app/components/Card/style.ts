import { StyleSheet } from "react-native";

interface Props { primaryColor: string, secondayColor: string }

export const useStyles = ({ primaryColor, secondayColor }: Props) => StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    flexDirection: "column",
    borderTopRightRadius: 30,
    borderRadius: 20,
    padding: 6,

    height: 110,
    width: 150,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.00,
    elevation: 5,
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: secondayColor,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: "OxygenRegular",
    fontSize: 25,
    paddingTop: 22,
  },

  label: {
    color: '#FFF',
    fontFamily: "OxygenLight",
    fontSize: 14,
    padding: 4,
    paddingTop: 15
  }

})
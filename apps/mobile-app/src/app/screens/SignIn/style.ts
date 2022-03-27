import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    padding: 15,
    height: '100%',
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  circle1: {
    backgroundColor: '#ed976c',
    height: 250,
    width: 250,
    borderRadius: 150,
    position: 'absolute',
    right: -80,
  },

  circle2: {
    backgroundColor: '#eb7f54',
    height: 180,
    width: 180,
    borderRadius: 150,
    position: 'absolute',
    top: 35,
    right: -55,
  },

  circleContainer: {
    backgroundColor: '#eb7f54',
    height: 250,
    width: '100%',
  },

  titleLogin: {
    position: 'absolute',
    fontFamily: 'OxygenBold',
    fontSize: 50,
    top: 50,
    left: 25,
    color: '#FFF',
  },

  titleWelcome: {
    position: 'absolute',
    fontFamily: 'OxygenLight',
    fontSize: 35,
    top: 120,
    left: 25,
    color: '#FFF',
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    padding: 15,
    paddingTop: 50,
    height: '100%',
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  
  circleContainer: {
    backgroundColor: '#ef6c00',
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

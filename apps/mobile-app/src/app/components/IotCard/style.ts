import { StyleSheet } from 'react-native';

interface Props {
  color?: string;
}

export const useStyles = ({ color }: Props) =>
  StyleSheet.create({
    container: {
      margin: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: 80,
      borderRadius: 20,
      shadowColor: '#D0D3D4',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.0,
      elevation: 1,
    },

    rowContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },

    openContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },

    title: {
      fontFamily: 'OxygenBold',
      fontSize: 16,
      color: '#000',
    },

    bodyContainer: {
      flexDirection: 'column',
      padding: 10,
    },

    iconContainer: {
      borderRadius: 20,
      borderBottomEndRadius: 50,
      height: 80,
      width: 80,
      backgroundColor: color || '#E5E8E8',
    },

    icon: {
      height: 80,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

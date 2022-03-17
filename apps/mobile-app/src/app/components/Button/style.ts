import { StyleSheet } from 'react-native';

interface Props { color: string | undefined, width: number | undefined }

export const useStyles = (props: Props) => StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    width: props.width,
    backgroundColor: props.color ? props.color : 'black',
  },

  text: {
    fontFamily: 'OxygenRegular',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});

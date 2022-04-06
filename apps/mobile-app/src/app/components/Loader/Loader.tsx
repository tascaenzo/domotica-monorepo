import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './style';

export interface LoaderProps {
  isLoading?: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color="#fff" />
    </View>
  );
};

export default Loader;

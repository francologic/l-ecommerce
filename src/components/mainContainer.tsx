import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

const MainContainer: React.FC = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default MainContainer;

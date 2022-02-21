import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const colors = {
  primary: '#E8E8E9',
  secondary: '#BE4C36',
  background: '#FFF',
  skeleton: '#5F5E5C',
  strong: '#000000',
};

export const sizes = {
  tiny: windowWidth / 8,
  extraSmall: windowWidth / 6,
  small: windowWidth / 5,
  medium: windowWidth / 4,
  large: windowWidth / 3,
  extraLarge: windowWidth / 2,
  fullSize: windowWidth,
};

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.strong,
  },
});

export const globalStyles = StyleSheet.create({
  dropShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  bottomSpacer: {
    height: 50,
  },
});

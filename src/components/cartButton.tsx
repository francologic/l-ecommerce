import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, sizes} from '../styles/theme';

const CartButton: React.FC<any> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartText}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '13%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: sizes.tiny,
    backgroundColor: colors.secondary,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default CartButton;

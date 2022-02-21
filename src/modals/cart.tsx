import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MainContainer from '../components/mainContainer';
import {colors, globalStyles, sizes, textStyles} from '../styles/theme';
import ShoppingCart, {Item} from '../../services/singleton/shoppingCart';
import DropShadow from 'react-native-drop-shadow';

const windowWidth = Dimensions.get('window').width;

const Cart: React.FC<any> = ({navigation}) => {
  const [attExtraData, setAttExtraData] = useState(false);

  const addItem = (item: Item) => {
    ShoppingCart.addProduct(item.product);
    setAttExtraData(!attExtraData);
  };

  const removeItem = (item: Item) => {
    ShoppingCart.removeProduct(item.product);
    setAttExtraData(!attExtraData);
  };

  const icon = (qtd: number) => {
    if (qtd > 1) {
      return 'minus';
    }
    return 'delete';
  };

  const buy = () => {
    ShoppingCart.buy();
    navigation.goBack();
  };

  const topNavBar = () => (
    <View style={styles.topNavBar}>
      <View style={[styles.navbarCel, styles.backButtonCell]}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.navbarCel}>
        <Text style={[textStyles.title, styles.navbarTitle]}>Cart</Text>
      </View>
      <View style={styles.navbarCel} />
    </View>
  );

  const renderItem = ({item}: {item: Item}) => (
    <View style={styles.productContainer}>
      <View style={styles.productSubContainer}>
        <DropShadow style={globalStyles.dropShadow}>
          <Image
            style={styles.productImage}
            source={{uri: item.product.image}}
          />
        </DropShadow>
        <View>
          <Text style={styles.titleText}>{item.product.title}</Text>
          <Text style={styles.priceText}>${item.product.price}</Text>
        </View>
        <View style={styles.qtdContainer}>
          <TouchableOpacity onPress={() => removeItem(item)}>
            <Icon name={icon(item.quantity)} size={30} />
          </TouchableOpacity>
          <View>
            <Text>{item.quantity}</Text>
          </View>
          <TouchableOpacity onPress={() => addItem(item)}>
            <Icon name="plus" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={[textStyles.title]}>There are no itens in your cart.</Text>
    </View>
  );

  const bottomBar = () => (
    <View style={styles.bottomContainer}>
      <Text style={styles.priceTextBottomBar}>
        ${ShoppingCart.getTotalPrice()}
      </Text>
      <TouchableOpacity style={styles.bottomButton} onPress={() => buy()}>
        <Text style={styles.buyText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <MainContainer>
      {topNavBar()}
      <FlatList
        data={ShoppingCart.itens}
        extraData={attExtraData}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmptyList}
        keyExtractor={(item, index) => `${index.toString()}`}
        renderItem={renderItem}
      />
      {ShoppingCart.itens.length > 0 && bottomBar()}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: Platform.OS === 'ios' ? 150 : 50,
  },
  topNavBar: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  list: {},
  navbarCel: {
    width: windowWidth / 3,
    justifyContent: 'center',
  },
  backButtonCell: {
    paddingLeft: 15,
  },
  backButtonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 50,
  },
  navbarTitle: {
    alignSelf: 'center',
  },
  productContainer: {
    width: '100%',
    alignItems: 'center',
  },
  productSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: sizes.large,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    backgroundColor: colors.skeleton,
    borderRadius: 10,
    height: sizes.medium,
    width: sizes.medium,
  },
  titleText: {
    maxWidth: '50%',
  },
  priceText: {
    color: colors.secondary,
  },
  priceTextBottomBar: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 22,
  },
  qtdContainer: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    height: '13%',
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    height: sizes.tiny,
    backgroundColor: colors.secondary,
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default Cart;

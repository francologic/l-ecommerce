import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainContainer from '../components/mainContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, globalStyles, sizes, textStyles} from '../styles/theme';
import DropShadow from 'react-native-drop-shadow';
import CartButton from '../components/cartButton';
import ShoppingCart from '../../services/singleton/shoppingCart';
import Product from '../../services/models/product';

const windowWidth = Dimensions.get('window').width;

const ProductScreen: React.FC<any> = ({route, navigation}) => {
  const item = route.params.product;
  const addToCart = (product: Product) => {
    ShoppingCart.addProduct(product);
    navigation.navigate('Cart');
  };
  const topNavBar = () => (
    <View style={styles.topNavBar}>
      <View style={[styles.navbarCel, styles.backButtonCell]}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.navbarCel}>
        <Text style={[textStyles.title, styles.navbarTitle]}>Details</Text>
      </View>
      <View style={styles.navbarCel} />
    </View>
  );
  return (
    <MainContainer>
      <ScrollView>
        {topNavBar()}
        <DropShadow style={globalStyles.dropShadow}>
          <Image style={styles.productImage} source={{uri: item.image}} />
        </DropShadow>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.descriptionTitle}>
          <Text style={styles.informationTitle}>Information</Text>
          <View style={styles.ratingContainer}>
            <Icon
              style={styles.star}
              name="star-outline"
              size={18}
              color="#FFD700"
            />
            <Text style={styles.ratingText}>{item.rating.rate}</Text>
          </View>
        </View>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.priceText}>${item.price}</Text>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => addToCart(item)}>
            <Text style={styles.cartText}>+ Add to cart</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.bottomSpacer} />
      </ScrollView>
      <CartButton navigation={navigation} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
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
  productImage: {
    alignSelf: 'center',
    width: '90%',
    height: sizes.fullSize,
    backgroundColor: colors.skeleton,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 18,
    width: '90%',
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginTop: 10,
  },
  star: {
    paddingRight: 10,
    alignSelf: 'center',
  },
  descriptionTitle: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.strong,
    textTransform: 'capitalize',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  informationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.strong,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.strong,
  },
  descriptionText: {
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 24,
    color: colors.secondary,
  },
  cartText: {
    fontSize: 18,
    color: colors.background,
  },
  cartButton: {
    backgroundColor: colors.secondary,
    width: '40%',
    height: sizes.tiny,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '6%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
});

export default ProductScreen;

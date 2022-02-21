import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainContainer from '../components/mainContainer';
import ProductsService from '../../services/controllers/products.service';
import Product from '../../services/models/product';
import {colors, globalStyles, sizes} from '../styles/theme';
import DropShadow from 'react-native-drop-shadow';
import CartButton from '../components/cartButton';

const ProductList: React.FC<any> = ({navigation}) => {
  useEffect(() => {
    didMount();
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(true);

  const didMount = async () => {
    try {
      const productsList = await ProductsService.getAll();
      setProducts(productsList);
    } catch (e) {
      if (typeof e === 'string') {
        Alert.alert(e);
      }
    } finally {
      setLoader(false);
    }
  };

  const renderLoader = () => (
    <ActivityIndicator style={styles.loader} size="large" />
  );

  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', {product: item})}
      style={[styles.productContainer]}>
      <View>
        <DropShadow style={globalStyles.dropShadow}>
          <Image style={styles.productImage} source={{uri: item.image}} />
        </DropShadow>
        <Text numberOfLines={2} style={styles.productText}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.productPrice}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => <View style={styles.footer} />;

  return (
    <MainContainer>
      {loader ? (
        renderLoader()
      ) : (
        <FlatList
          data={products}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          numColumns={2}
          keyExtractor={(item, index) => `${index.toString()}`}
          ListFooterComponent={renderFooter}
          renderItem={renderProduct}
        />
      )}
      <View style={globalStyles.bottomSpacer} />
      <CartButton navigation={navigation} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: Platform.OS === 'ios' ? 150 : 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '85%',
    alignSelf: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '45%',
  },
  productImage: {
    backgroundColor: colors.skeleton,
    borderRadius: 10,
    height: sizes.extraLarge,
  },
  productText: {
    width: sizes.large,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 10,
  },
  productPrice: {
    width: sizes.large,
    fontSize: 16,
    paddingBottom: 20,
    color: colors.secondary,
  },
});

export default ProductList;

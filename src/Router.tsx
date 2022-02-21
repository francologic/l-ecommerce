import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from './screens/productList';
import ProductScreen from './screens/product';
import Cart from './modals/cart';

const Stack = createStackNavigator();

function Router({}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ProductList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false, presentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;

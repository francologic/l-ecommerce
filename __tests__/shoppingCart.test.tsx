import React from 'react';
import Product from '../services/models/product';
import ShoppingCart from '../services/singleton/shoppingCart';
import {render} from '@testing-library/react-native';
import Cart from '../src/modals/cart';

describe('Shopping cart', () => {
  it('should add ta product to shopping cart', () => {
    ShoppingCart.addProduct(
      new Product(
        3,
        'Notebook',
        55.99,
        'A cool notebook',
        'Eletronics',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        {rate: 5, count: 30},
      ),
    );
  });

  it('should render the product', () => {
    const {getByText} = render(<Cart />);
    expect(getByText('Notebook')).toBeTruthy();
  });

  it('should render the buy button', () => {
    const {getByText} = render(<Cart />);
    expect(getByText('Buy')).toBeTruthy();
  });

  it('should add the same product to shopping cart, and only increment the count', () => {
    ShoppingCart.addProduct(
      new Product(
        3,
        'Notebook',
        55.99,
        'A cool notebook',
        'Eletronics',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        {rate: 5, count: 30},
      ),
    );
    expect(ShoppingCart.itens[0].quantity).toBe(2);
  });

  it('should render the count of the product', () => {
    const {getByText} = render(<Cart />);
    expect(getByText('2')).toBeTruthy();
  });

  it('should add the another product to shopping cart', () => {
    ShoppingCart.addProduct(
      new Product(
        4,
        'Playstation 5',
        600.99,
        'A cool vide-game',
        'Eletronics',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        {rate: 10, count: 500},
      ),
    );
    expect(ShoppingCart.itens.length).toBe(2);
  });

  it('should render another product', () => {
    const {getByText} = render(<Cart />);
    expect(getByText('Playstation 5')).toBeTruthy();
  });

  it('should decrease the count of a product from the shopping cart', () => {
    ShoppingCart.removeProduct(
      new Product(
        3,
        'Notebook',
        55.99,
        'A cool notebook',
        'Eletronics',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        {rate: 5, count: 30},
      ),
    );
    expect(ShoppingCart.itens[0].quantity).toBe(1);
  });

  it('should render the new count of the product', () => {
    const {queryByText} = render(<Cart />);
    expect(queryByText('2')).toBeFalsy();
  });

  it('should remove a product from the shopping cart', () => {
    ShoppingCart.removeProduct(
      new Product(
        3,
        'Notebook',
        55.99,
        'A cool notebook',
        'Eletronics',
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        {rate: 5, count: 30},
      ),
    );
    expect(ShoppingCart.itens.length).toBe(1);
  });

  it('should not render the product', () => {
    const {queryByText} = render(<Cart />);
    expect(queryByText('Notebook')).toBeFalsy();
  });

  it('should return the total price from the shopping cart', () => {
    expect(ShoppingCart.getTotalPrice()).toBe('600.99');
  });

  it('should clean the shopping cart', () => {
    ShoppingCart.buy();
    expect(ShoppingCart.itens.length).toBe(0);
  });
});

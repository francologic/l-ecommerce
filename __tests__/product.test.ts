import Product from '../services/models/product';

it('should create a product', () => {
  let newProduct = new Product(
    3,
    'Notebook',
    55.99,
    'A cool notebook',
    'Eletronics',
    'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    {rate: 5, count: 30},
  );
  expect(newProduct).toEqual(expect.any(Object));
});

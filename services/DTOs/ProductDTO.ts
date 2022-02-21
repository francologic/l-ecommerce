import axios from 'axios';
import Product from '../models/product';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
});

class ProductDTO {
  getAllProducts(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      await api
        .get('products', {})
        .then(res => resolve(res.data))
        .catch(e => reject(new Error(e)));
    });
  }

  getLimitedProducts(limit: number): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      await api
        .get(`products?limit=${limit}`, {})
        .then(res => resolve(res.data))
        .catch(e => reject(new Error(e)));
    });
  }

  getProductById(id: number): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      await api
        .get(`products/${id}`, {})
        .then(res => resolve(res.data))
        .catch(e => reject(new Error(e)));
    });
  }
}

export default new ProductDTO();

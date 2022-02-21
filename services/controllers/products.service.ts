import ProductDTO from '../DTOs/ProductDTO';

class ProductsService {
  async getAll(limit?: number) {
    if (limit) {
      ProductDTO.getLimitedProducts(limit);
    }
    return ProductDTO.getAllProducts();
  }
  async getById(id: number) {
    return ProductDTO.getProductById(id);
  }
}

export default new ProductsService();

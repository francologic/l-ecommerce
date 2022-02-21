import Product from '../models/product';

export type Item = {
  quantity: number;
  product: Product;
};

class ShoppingCart {
  itens: Item[] = [];

  buy() {
    this.itens = [];
  }

  getTotalPrice() {
    let price: number = 0;
    this.itens.forEach(item => {
      let itemPrice = item.product.price * item.quantity;
      price = price + itemPrice;
    });
    return price.toFixed(2);
  }

  addProduct(product: Product) {
    let found = false;
    for (let index = 0; index < this.itens.length; index++) {
      const item = this.itens[index];
      if (item.product.id === product.id) {
        this.itens[index].quantity++;
        found = true;
        return;
      }
    }
    if (!found) {
      this.itens.push({quantity: 1, product});
    }
  }

  removeProduct(product: Product) {
    for (let index = 0; index < this.itens.length; index++) {
      const item = this.itens[index];
      if (item.product.id === product.id) {
        if (this.itens[index].quantity === 1) {
          this.itens.splice(index, 1);
          return;
        }
        this.itens[index].quantity--;
        return;
      }
    }
  }
}

export default new ShoppingCart();

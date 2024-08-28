export class ProductsService {
  static #instance;

  constructor() {
    if (!ProductsService.#instance) ProductsService.#instance = this;
    return ProductsService.#instance;
  }

  async getProducts() {
    if (!this.products) {
      const iceCreamProducts = await (
        await fetch("api/ice-cream-menu.json")
      ).json();
      const dessertProducts = await (
        await fetch("api/desserts-menu.json")
      ).json();
      const drinksProducts = await (await fetch("api/drinks-menu.json")).json();
      this.products = [
        ...iceCreamProducts,
        ...dessertProducts,
        ...drinksProducts,
      ];

      this.products.forEach((product) => {
        if (!product.type) {
          console.error("Product without type found:", product);
        }
      });
    }
    return this.products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }
}

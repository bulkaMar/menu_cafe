export class ProductsService {
    static #instance;
    constructor() {
        if (!ProductsService.#instance) ProductsService.#instance = this;
        return ProductsService.#instance;
    }

	async getProducts() {
		if (!this.products) {
			this.products = await (await fetch('api/ice-cream-menu.json')).json();
			console.log('Fetched products:', this.products); 
		}
		return this.products;
	}
	

	async getProductById(id) {
		const products = await this.getProducts();
		console.log('Looking for product with ID:', id);
		const product = products.find(product => product.id === id);
		console.log('Found product:', product); 
		return product;
	}
	
}
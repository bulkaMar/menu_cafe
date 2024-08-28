import { ProductsService } from "./products-service.js";

export class Cart {
  static #instance;
  constructor() {
    if (Cart.#instance) return Cart.#instance;
    Cart.#instance = this;
    this.container = document.querySelector(".shopping_cart-items-list");
    this.iconCart = document.querySelector("#shopping_cart-icon");
    this.closeBtn = document.querySelector(".shopping_cart-checkout-close");
    this.quantitySpan = document.querySelector(".shopping_cart__quantity");
    this.productsService = new ProductsService();
    this.cart = JSON.parse(localStorage.getItem("cart") || "{}");
    this.addEventListeners();
    this.renderCart();
  }

  addEventListeners() {
    this.iconCart.addEventListener("click", () => {
      document.body.classList.toggle("activeTabCart");
    });

    this.closeBtn.addEventListener("click", () => {
      document.body.classList.toggle("activeTabCart");
    });

    this.quantitySpan.addEventListener("click", () => {
      this.updateQuantitySpan();
    });
  }

  async renderCart() {
    let total = 0;
    let cartDomString = ``;
    for (const productId in this.cart) {
      const productIdInt = parseInt(productId, 10);
      if (isNaN(productIdInt)) {
        console.error(`Invalid productId: ${productId}`);
        continue;
      }

      try {
        const product = await this.productsService.getProductById(productIdInt);
        if (!product || !product.name || !product.price) {
          console.error(`Invalid product data for ID: ${productId}`, product);
          continue;
        }
        cartDomString += this.createCartProductDomString(product);
        total += product.price * this.cart[productId];
      } catch (error) {
        console.error(`Error fetching product with ID: ${productId}`, error);
      }
    }
    cartDomString += `<div class="shopping_cart-checkout">
            <div class="shopping_cart-checkout-total" hx-swap="outerHTML">Total amount:<span hx-swap="outerHTML" id="total-amount">$${total.toFixed(
              2
            )}</span></div>
          </div>`;
    this.container.innerHTML = cartDomString;
    this.container
      .querySelectorAll(".plus")
      .forEach((el) =>
        el.addEventListener("click", (ev) =>
          this.changeQuantity(ev, this.addProductOperation)
        )
      );
    this.container
      .querySelectorAll(".minus")
      .forEach((el) =>
        el.addEventListener("click", (ev) =>
          this.changeQuantity(ev, this.deleteProductOperation)
        )
      );
    this.updateQuantitySpan();
  }

  createCartProductDomString(product) {
    if (!product || !product.name || !product.price) {
      console.error("Invalid product data:", product);
      return "";
    }

    return `<div class="cart-container" data-id="${product.id}"> 
				 <div class="cart-container-img">
                    <img src="${product.img}" alt="${product.name}" />
                  </div>
				 <div class="cart-container-text">
		 			<div class="cart-title">${product.name}</div>
                  	<div class="cart-price">$${product.price}</div>
                  	<div class="cart-quantity">${this.cart[product.id]}</div>
                  	<div class="cart-btn-minus"><button data-id=${
                      product.id
                    } class="btn btn-sm minus">-</button></div>
					<div class="cart-btn-plus"><button data-id=${
            product.id
          } class="btn btn-sm plus">+</button></div>
                 </div>
                </div>`;
  }

  changeQuantity(ev, operation) {
    ev.stopPropagation();
    operation.call(this, ev.target.dataset.id);
    this.saveCart();
    this.renderCart();
  }

  addProductOperation(id) {
    this.cart[id] = (this.cart[id] || 0) + 1;
  }

  deleteProductOperation(id) {
    if (this.cart[id] > 1) {
      this.cart[id] -= 1;
    } else {
      delete this.cart[id];
    }
  }

  addProduct(id) {
    this.addProductOperation(id);
    this.saveCart();
    this.renderCart();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  updateQuantitySpan() {
    this.quantitySpan.innerHTML = Object.values(this.cart).reduce(
      (acc, quantity) => acc + quantity,
      0
    );
  }
}

new Cart();

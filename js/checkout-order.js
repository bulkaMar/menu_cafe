import { ProductsService } from "./products-service.js";
import { showAlertSubmit } from "./alertSubmit.js";
import { showModalDiscount } from "./modalDiscount.js";

export class CheckCart {
  constructor() {
    this.cart = this.loadCartFromLocalStorage();
    this.checkoutForm = document.querySelector("#checkoutForm");
    this.renderCheckoutCart();
    this.handleSubmit();
  }

  loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    return cart;
  }

  async renderCheckoutCart() {
    const productsService = new ProductsService();
    let cartDomString = "";
    let total = 0;

    for (const productId in this.cart) {
      const productIdInt = parseInt(productId, 10);
      if (isNaN(productIdInt)) {
        continue;
      }

      const product = await productsService.getProductById(productIdInt);

      if (!product || !product.name || !product.price) {
        continue;
      }

      const productTotal = product.price * this.cart[productId];
      total += productTotal;
      cartDomString += `
        <div class="checkout-content-item">
          <p class="checkout-content-item-title">${product.name}</p>
          <div class="checkout-content-item-quantity">${this.cart[productId]}</div>
          <div class="checkout-content-item-total">$${productTotal.toFixed(2)}</div>
        </div>
        <div class="line"></div>`;
    }

    const itemsContainer = document.querySelector(".checkout-content-items");
    const subtotalElement = document.querySelector(".checkout-content-cart-subtotal span");
    const totalElement = document.querySelector(".checkout-content-cart-total_all span");

    if (itemsContainer && subtotalElement && totalElement) {
      itemsContainer.innerHTML = cartDomString;
      subtotalElement.innerText = `$${total.toFixed(2)}`;
      totalElement.innerText = `$${(total + 3).toFixed(2)}`;
    }
  }

  async calculateTotalPrice() {
    const productsService = new ProductsService();
    const totalPrice = await Object.keys(this.cart).reduce(async (accPromise, productId) => {
        const acc = await accPromise;
        const productIdInt = parseInt(productId, 10);
        if (isNaN(productIdInt)) {
            return acc;
        }
        const product = await productsService.getProductById(productIdInt);
        if (product && product.price) {
            return acc + (product.price * this.cart[productId]);
        }
        return acc;
    }, Promise.resolve(0));
    return totalPrice;
}

async handleSubmit() {
    if (this.checkoutForm) {
        this.checkoutForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(this.checkoutForm);
            const data = Object.fromEntries(formData.entries());
            const phoneNumber = data.phone;

            const discountResponse = await fetch(`http://localhost:3005/api/check-phone/${phoneNumber}`);
            const discountData = await discountResponse.json();

            let totalPrice = await this.calculateTotalPrice();
            if (typeof totalPrice === 'number') {
                if (discountData.discount) {
                    totalPrice *= 0.9;
                    showModalDiscount("You make order recently so you have a discount 10%", totalPrice);
                } else {
                    showAlertSubmit();
                }
                data.totalPrice = totalPrice.toFixed(2);
            } else {
                console.error('Total price is not a number:', totalPrice);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 5000));

            const productsService = new ProductsService();
            const products = await Promise.all(Object.keys(this.cart).map(async (productId) => {
                const productIdInt = parseInt(productId, 10);
                if (isNaN(productIdInt)) {
                    return null;
                }

                const product = await productsService.getProductById(productIdInt);
                if (product) {
                    return {
                        name: product.name,
                        quantity: this.cart[productId]
                    };
                }
                return null;
            }));

            const validProducts = products.filter(product => product !== null);

            data.products = validProducts;

            try {
                const response = await fetch("http://localhost:3005/api/order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log("Form data submitted:", data);
                console.log("Server response:", responseData);
                if (!discountData.discount) {
                    showAlertSubmit();
                }

                this.checkoutForm.reset();
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("Error submitting form, sorry our server don't work now");
            }
        });
    }
}






}

new CheckCart();


let iconCart = document.querySelector("#shopping_cart-icon");
let closeBtn = document.querySelector(".shopping_cart-checkout-close");
let checkoutBtn = document.querySelector(".shopping_cart-checkout-btn");
let totalContainer = document.querySelector(".shopping_cart-checkout-total");
let totalText = document.querySelector("#total-amount");
let body = document.querySelector("body");
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});

closeBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});

const setProductInCart = (idProduct, quantity, position) => {
  if (quantity > 0) {
    if (position < 0) {
      cart.push({
        product_id: idProduct,
        quantity: quantity,
      });
    } else {
      cart[position].quantity = quantity;
    }
  }
  refreshCartHTML();
};

const refreshCartHTML = () => {
  let listHTML = document.querySelector(".shopping_cart-items-list");
  let totalHtml = document.querySelector(".shopping_cart__quantity");
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity = totalQuantity + item.quantity;
  });
  totalHtml.innerText = totalQuantity;
};
document.addEventListener('click', (event) => {
	console.log('Click detected:', event.target);
	if (event.target.classList.contains('menu-view-menu-modal-add')) {
	  console.log('Add button clicked');
	  let idProduct = event.target.dataset.id;
	  let position = cart.findIndex((value) => value.product_id === idProduct);
	  let quantity = position < 0 ? 0 : cart[position].quantity;
	  quantity++;
	  setProductInCart(idProduct, quantity, position);
	  console.log('Product added:', idProduct);
	}
  });

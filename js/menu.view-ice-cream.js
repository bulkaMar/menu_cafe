import { Cart } from "./cart.js";
import { ProductsService } from "./products-service.js";

export class ProductList {
  constructor() {
    console.log("ProductList constructor called");
    this.container = document.querySelector("#modal-container-ice");
    this.productsService = new ProductsService();
    this.leftColumn = document.getElementById("left-column");
    this.rightColumn = document.getElementById("right-column");
    if (!this.container || !this.leftColumn || !this.rightColumn) {
      console.error("One or more required elements are missing from the DOM.");
      return;
    }
    this.renderProducts();
  }

  async renderProducts() {
    console.log("Rendering products...");
    let leftItems = "";
    let rightItems = "";
    try {
      const products = await this.productsService.getProducts();
      console.log("Products fetched:", products);

      if (products.length === 0) {
        console.warn("No products available.");
      }

      products.forEach((product, index) => {
        const itemHtml = `
                    <div class="view-menu-meals-item-ice" data-name="${product.name}">
                        <div class="view-menu-meals-item-img">
                            <img src="${product.img}" alt="${product.name}" />
                        </div>
                        <div class="view-menu-meals-item-text">
                            <div class="view-menu-meals-item-container">
                                <h2 class="view-menu-meals-item-title">${product.name}</h2>
                                <div class="view-menu-meals-item-line"></div>
                                <p class="view-menu-meals-item-price">$${product.price}</p>
                            </div>
                            <p class="view-menu-meals-item-desc">${product.description}</p>
                        </div>
                    </div>
                `;
        if (index < Math.ceil(products.length / 2)) {
          leftItems += itemHtml;
        } else {
          rightItems += itemHtml;
        }
      });

      console.log("Left column items:", leftItems);
      console.log("Right column items:", rightItems);

      this.leftColumn.innerHTML = leftItems;
      this.rightColumn.innerHTML = rightItems;

      this.renderModal(products);
      this.addEventListeners();
    } catch (error) {
      console.error("Error rendering products:", error);
    }
  }

  async renderModal(products) {
    console.log("Rendering modal...");
    let modalHtml = "";
    products.forEach((product) => {
      modalHtml += `
                <div class="menu-view-menu-modal-content-ice" data-target="${
                  product.name
                }">
                    <div class="modal-close-ice close-modal-ice" title="Close">
                        <img
                            class="modal-close-ice close-modal-ice"
                            src="img/book-and-offer/icons-close.png"
                            alt="Close icon"
                        />
                    </div>
                    <div class="menu-view-menu-modal-img">
                        <img src="${product.img}" alt="${product.name}" />
                    </div>
                    <div class="menu-view-menu-modal-text">
                        <h2 class="menu-view-menu-modal-title">${
                          product.name
                        }</h2>
                        <p class="menu-view-menu-modal-desc">${
                          product.description
                        }</p>
                        <p class="menu-view-menu-modal-ingridients">
				          <span>Ingredients:</span> ${product.ingredients.join(", ")}
				        </p>
                        <p class="menu-view-menu-modal-weight"><span>Weight:</span> ${
                          product.weight
                        } grams</p>
                        <p class="menu-view-menu-modal-price">$${
                          product.price
                        }</p>
                        <button class="menu-view-menu-modal-add" data-id="${
                          product.id
                        }"><span>Add to favorite</span></button>
                    </div>
                </div>
            `;
    });
    console.log((this.container.innerHTML = modalHtml));
  }

  addEventListeners() {
    console.log("Adding event listeners...");

    document.querySelectorAll(".menu-view-menu-modal-add").forEach((btn) => {
      btn.addEventListener("click", this.addProductToCart.bind(this));
    });

    document
      .querySelectorAll(".view-menu-meals-item-ice")
      .forEach((product) => {
        product.onclick = () => {
          const name = product.getAttribute("data-name");
          document
            .querySelectorAll(".menu-view-menu-modal-content-ice")
            .forEach((content) => {
              if (content.getAttribute("data-target") === name) {
                content.style.display = "flex";
              } else {
                content.style.display = "none";
              }
            });
          this.container.style.display = "flex";
        };
      });

    document.querySelectorAll(".modal-close-ice").forEach((closeButton) => {
      closeButton.onclick = () => {
        this.container.style.display = "none";
        document
          .querySelectorAll(".menu-view-menu-modal-content-ice")
          .forEach((content) => {
            content.style.display = "none";
          });
      };
    });

    this.container.onclick = (event) => {
      if (event.target === this.container) {
        this.container.style.display = "none";
        document
          .querySelectorAll(".menu-view-menu-modal-content-ice")
          .forEach((content) => {
            content.style.display = "none";
          });
      }
    };
  }

  addProductToCart(event) {
    const id = event.currentTarget.dataset.id;
    console.log("Adding product to cart, ID:", id);
    const cart = new Cart();
    cart.addProduct(id);
  }
}

new ProductList();

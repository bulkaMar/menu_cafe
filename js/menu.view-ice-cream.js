import { Cart } from "./cart.js";
import { ProductsService } from "./products-service.js";

export class ProductList {
  constructor() {
    console.log("ProductList constructor called");

    this.leftColumnIce = document.getElementById("left-column");
    this.rightColumnIce = document.getElementById("right-column");

    this.iceCreamContainer = document.querySelector("#modal-container-ice");

    if (
      !this.leftColumnIce ||
      !this.rightColumnIce ||
      !this.iceCreamContainer
    ) {
      console.error("One or more required DOM elements are missing.");
      return;
    }

    this.productsService = new ProductsService();

    this.renderProducts("ice-cream");
  }

  async renderProducts(type) {
    console.log(`Rendering ${type} products...`);
    let leftItems = "";
    let rightItems = "";

    try {
      const products = await this.productsService.getProducts();
      console.log(`${type} products fetched:`, products);

      const filteredProducts = products.filter(
        (product) => product.type === type
      );
      if (filteredProducts.length === 0) {
        console.warn(`No ${type} products available.`);
        return;
      }

      filteredProducts.forEach((product, index) => {
        const itemHtml = `
          <div class="view-menu-meals-item-${type}" data-name="${product.name}">
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

        if (index < Math.ceil(filteredProducts.length / 2)) {
          leftItems += itemHtml;
        } else {
          rightItems += itemHtml;
        }
      });

      this.leftColumnIce.innerHTML = leftItems;
      this.rightColumnIce.innerHTML = rightItems;

      this.renderModal(filteredProducts, type, this.iceCreamContainer);
      this.addEventListeners(type);
    } catch (error) {
      console.error(`Error rendering ${type} products:`, error);
    }
  }

  async renderModal(products, type, container) {
    console.log(`Rendering ${type} modal...`);
    let modalHtml = "";

    products.forEach((product) => {
      if (!product.id) {
        console.error("Product without id found:", product);
      } else {
        modalHtml += `
          <div class="menu-view-menu-modal-content-${type}" data-target="${
          product.name
        }">
            <div class="modal-close-${type} close-modal-${type}" title="Close">
              <img
                class="modal-close-${type} close-modal-${type}"
                src="img/book-and-offer/icons-close.png"
                alt="Close icon"
              />
            </div>
            <div class="menu-view-menu-modal-img">
              <img src="${product.img}" alt="${product.name}" />
            </div>
            <div class="menu-view-menu-modal-text">
              <h2 class="menu-view-menu-modal-title">${product.name}</h2>
              <p class="menu-view-menu-modal-desc">${product.description}</p>
              <p class="menu-view-menu-modal-ingridients">
                <span>Ingredients:</span> ${product.ingredients.join(", ")}
              </p>
              <p class="menu-view-menu-modal-weight"><span>Weight:</span> ${
                product.weight
              } grams</p>
              <p class="menu-view-menu-modal-price">$${product.price}</p>
              <button class="menu-view-menu-modal-add" data-id="${
                product.id
              }"><span>Add to favorite</span></button>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = modalHtml;
  }

  addEventListeners(type) {
    console.log(`Adding event listeners for ${type}...`);

    document.querySelectorAll(`.menu-view-menu-modal-add`).forEach((btn) => {
      btn.addEventListener("click", this.addProductToCart.bind(this));
    });

    document
      .querySelectorAll(`.view-menu-meals-item-${type}`)
      .forEach((product) => {
        product.onclick = () => {
          const name = product.getAttribute("data-name");
          document
            .querySelectorAll(`.menu-view-menu-modal-content-${type}`)
            .forEach((content) => {
              if (content.getAttribute("data-target") === name) {
                content.style.display = "flex";
              } else {
                content.style.display = "none";
              }
            });
          this.iceCreamContainer.style.display = "flex";
        };
      });

    document.querySelectorAll(`.modal-close-${type}`).forEach((closeButton) => {
      closeButton.onclick = () => {
        this.iceCreamContainer.style.display = "none";
        document
          .querySelectorAll(`.menu-view-menu-modal-content-${type}`)
          .forEach((content) => {
            content.style.display = "none";
          });
      };
    });

    this.iceCreamContainer.onclick = (event) => {
      if (event.target === this.iceCreamContainer) {
        this.iceCreamContainer.style.display = "none";
        document
          .querySelectorAll(`.menu-view-menu-modal-content-${type}`)
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
localStorage.clear();

import { Cart } from "./cart.js";
import { ProductsService } from "./products-service.js";

export class DessertList {
  constructor() {
    this.dessertsContainer = document.querySelector(
      "#modal-container-desserts"
    );
    this.leftColumnDesserts = document.getElementById("left-column-desserts");
    this.rightColumnDesserts = document.getElementById("right-column-desserts");

    if (
      !this.dessertsContainer ||
      !this.leftColumnDesserts ||
      !this.rightColumnDesserts
    ) {
      return;
    }

    this.productsService = new ProductsService();
    this.renderDesserts();
  }

  async renderDesserts() {
    let leftItems = "";
    let rightItems = "";

    const products = await this.productsService.getProducts();
    const filteredDesserts = products.filter(
      (product) => product.type === "desserts"
    );
    if (filteredDesserts.length === 0) {
      return;
    }

    filteredDesserts.forEach((product, index) => {
      const itemHtml = `
        <div class="view-menu-meals-item-desserts" data-name="${product.name}">
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
      if (index < Math.ceil(filteredDesserts.length / 2)) {
        leftItems += itemHtml;
      } else {
        rightItems += itemHtml;
      }
    });

    this.leftColumnDesserts.innerHTML = leftItems;
    this.rightColumnDesserts.innerHTML = rightItems;

    this.renderModal(filteredDesserts);
    this.addEventListeners();
  }

  async renderModal(desserts) {
    let modalHtml = "";

    desserts.forEach((product) => {
      if (product.id) {
        modalHtml += `
          <div class="menu-view-menu-modal-content-desserts" data-target="${
            product.name
          }">
            <div class="modal-close-desserts" title="Close">
              <img
                class="modal-close-desserts"
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
              <button class="menu-view-menu-modal-add-desserts" data-id="${
                product.id
              }"><span>Add to favorite</span></button>
            </div>
          </div>
        `;
      }
    });

    this.dessertsContainer.innerHTML = modalHtml;
  }

  addEventListeners() {
    this.removeOldEventListeners();

    document
      .querySelectorAll(`.menu-view-menu-modal-add-desserts`)
      .forEach((btn) => {
        btn.addEventListener("click", this.addProductToCart.bind(this));
      });

    document
      .querySelectorAll(`.view-menu-meals-item-desserts`)
      .forEach((product) => {
        product.onclick = () => {
          const name = product.getAttribute("data-name");
          document
            .querySelectorAll(`.menu-view-menu-modal-content-desserts`)
            .forEach((content) => {
              if (content.getAttribute("data-target") === name) {
                content.style.display = "flex";
              } else {
                content.style.display = "none";
              }
            });
          this.dessertsContainer.style.display = "flex";
        };
      });

    document
      .querySelectorAll(`.modal-close-desserts`)
      .forEach((closeButton) => {
        closeButton.onclick = () => {
          this.dessertsContainer.style.display = "none";
          document
            .querySelectorAll(`.menu-view-menu-modal-content-desserts`)
            .forEach((content) => {
              content.style.display = "none";
            });
        };
      });

    let addBtn = document.querySelectorAll(
      `.menu-view-menu-modal-add-desserts`
    );
    let closeModal = document.querySelectorAll(`.menu-view-menu-modal`);

    addBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        closeModal.forEach((modal) => {
          modal.style.display = "none";
        });
      });
    });

    this.dessertsContainer.onclick = (event) => {
      if (event.target === this.dessertsContainer) {
        this.dessertsContainer.style.display = "none";
        document
          .querySelectorAll(`.menu-view-menu-modal-content-desserts`)
          .forEach((content) => {
            content.style.display = "none";
          });
      }
    };
  }

  removeOldEventListeners() {
    document.querySelectorAll(`.menu-view-menu-modal-add`).forEach((btn) => {
      btn.removeEventListener("click", this.addProductToCart.bind(this));
    });
  }

  addProductToCart(event) {
    const id = event.currentTarget.dataset.id;
    const cart = new Cart();
    cart.addProduct(id);
  }
}

new DessertList();

import { Cart } from "./cart.js";
import { ProductsService } from "./products-service.js";

export class DrinksList {
  constructor() {
    this.drinksContainer = document.querySelector("#modal-container-dr");
    this.leftColumnDrinks = document.getElementById("left-column-dr");
    this.rightColumnDrinks = document.getElementById("right-column-dr");

    if (
      !this.drinksContainer ||
      !this.leftColumnDrinks ||
      !this.rightColumnDrinks
    ) {
      console.error("Drinks DOM elements are missing.");
      return;
    }

    this.productsService = new ProductsService();
    this.renderDrinks();
  }

  async renderDrinks() {
    let leftItems = "";
    let rightItems = "";

    const products = await this.productsService.getProducts();
    const filteredDrinks = products.filter(
      (product) => product.type === "drinks"
    );
    if (filteredDrinks.length === 0) {
      console.warn(`No drinks available.`);
      return;
    }

    filteredDrinks.forEach((product, index) => {
      const itemHtml = `
		<div class="view-menu-meals-item" data-name="${product.name}">
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
      if (index < Math.ceil(filteredDrinks.length / 2)) {
        leftItems += itemHtml;
      } else {
        rightItems += itemHtml;
      }
    });

    this.leftColumnDrinks.innerHTML = leftItems;
    this.rightColumnDrinks.innerHTML = rightItems;

    this.renderModal(filteredDrinks);
    this.addEventListeners();
  }

  renderModal(drinks) {
    let modalHtml = "";

    drinks.forEach((product) => {
      if (!product.id) {
        console.error("Product without id found:", product);
      } else {
        modalHtml += `
         	  <div class="menu-view-menu-modal-content" data-target="${
              product.name
            }">
				<div class="modal-close close-modal" title="Close">
				  <img
					class="modal-close close-modal"
					src="img/book-and-offer/icons-close.png"
					alt="Close icon"
				  />
				</div>
				<div class="menu-view-menu-modal-img">
				  <img
					src="${product.img}"
					alt="${product.name}"
				  />
				</div>
				<div class="menu-view-menu-modal-text">
				  <h2 class="menu-view-menu-modal-title">${product.name}</h2>
				  <p class="menu-view-menu-modal-desc">
					${product.description}
				  </p>
				  <p class="menu-view-menu-modal-ingridients">
					<span>Ingredients:</span> ${product.ingredients.join(", ")}
				  </p>
				  <p class="menu-view-menu-modal-weight"><span>Volume:</span> ${
            product.volume
          } ml</p>
				  <p class="menu-view-menu-modal-price">$${product.price}</p>
				  <button class="menu-view-menu-modal-add-drinks" data-id="${product.id}">
  					<span>Add to favorite</span>
				  </button>

				</div>
			  </div>
		`;
      }
    });

    this.drinksContainer.innerHTML = modalHtml;
  }

  addEventListeners() {
    this.removeOldEventListeners();

    document
      .querySelectorAll(`.menu-view-menu-modal-add-drinks`)
      .forEach((btn) => {
        btn.addEventListener("click", this.addProductToCart.bind(this));
      });

    document.querySelectorAll(`.view-menu-meals-item`).forEach((product) => {
      product.onclick = () => {
        const name = product.getAttribute("data-name");
        document
          .querySelectorAll(`.menu-view-menu-modal-content`)
          .forEach((content) => {
            if (content.getAttribute("data-target") === name) {
              content.style.display = "flex";
            } else {
              content.style.display = "none";
            }
          });
        this.drinksContainer.style.display = "flex";
      };
    });
    let addBtn = document.querySelectorAll(`.menu-view-menu-modal-add-drinks`);
    let closeModal = document.querySelectorAll(`.menu-view-menu-modal`);

    addBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        closeModal.forEach((modal) => {
          modal.style.display = "none";
        });
      });
    });
    document.querySelectorAll(`.modal-close`).forEach((closeButton) => {
      closeButton.onclick = () => {
        this.drinksContainer.style.display = "none";
        document
          .querySelectorAll(`.menu-view-menu-modal-content`)
          .forEach((content) => {
            content.style.display = "none";
          });
      };
    });

    this.drinksContainer.onclick = (event) => {
      if (event.target === this.drinksContainer) {
        this.drinksContainer.style.display = "none";
        document
          .querySelectorAll(`.menu-view-menu-modal-content`)
          .forEach((content) => {
            content.style.display = "none";
          });
      }
    };
  }

  removeOldEventListeners() {
    document
      .querySelectorAll(`.menu-view-menu-modal-add-drinks`)
      .forEach((btn) => {
        btn.removeEventListener("click", this.addProductToCart.bind(this));
      });
  }

  addProductToCart(event) {
    const id = event.currentTarget.dataset.id;
    const cart = new Cart();
    cart.addProduct(id);
  }
}

new DrinksList();

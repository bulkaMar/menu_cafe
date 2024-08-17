const modalContainer = document.querySelector("#modal-container-des");
const shopingCart = document.querySelector("#shopping_cart-des");

const response = await fetch("api/desserts-menu.json");
const desserts = await response.json();
const leftColumn = document.getElementById("left-column-des");
const rightColumn = document.getElementById("right-column-des");

let leftItems = "";
let rightItems = "";

desserts.forEach((dessert, index) => {
  const itemHtml = `
		<div class="view-menu-meals-item-des" data-name="${dessert.name}">
		  <div class="view-menu-meals-item-img">
			<img src="${dessert.img}" alt="${dessert.name}" />
		  </div>
		  <div class="view-menu-meals-item-text">
			<div class="view-menu-meals-item-container">
			  <h2 class="view-menu-meals-item-title">${dessert.name}</h2>
			  <div class="view-menu-meals-item-line"></div>
			  <p class="view-menu-meals-item-price">$${dessert.price}</p>
			</div>
			<p class="view-menu-meals-item-desc">${dessert.description}</p>
		  </div>
		</div>
		`;
  if (index < 4) {
    leftItems += itemHtml;
  } else {
    rightItems += itemHtml;
  }
});

leftColumn.innerHTML = leftItems;
rightColumn.innerHTML = rightItems;

function renderModal() {
  let modalHtml = "";
  desserts.forEach((dessert) => {
    modalHtml += `
			<div class="menu-view-menu-modal-content-des" data-target="${dessert.name}">
			  <div class="modal-close-des modal-close-des" title="Close">
				<img
				  class="modal-close-des close-modal-des"
				  src="img/book-and-offer/icons-close.png"
				  alt="Close icon"
				/>
			  </div>
			  <div class="menu-view-menu-modal-img">
				<img
				  src="${dessert.img}"
				  alt="${dessert.name}"
				/>
			  </div>
			  <div class="menu-view-menu-modal-text">
				<h2 class="menu-view-menu-modal-title">${dessert.name}</h2>
				<p class="menu-view-menu-modal-desc">
				  ${dessert.description}
				</p>
				<p class="menu-view-menu-modal-ingridients">
				  <span>Ingredients:</span> ${dessert.ingredients.join(", ")}
				</p>
				<p class="menu-view-menu-modal-weight"><span>Weight:</span> ${
          dessert.weight
        } grams</p>
				<p class="menu-view-menu-modal-price">$${dessert.price}</p>
				<button class="menu-view-menu-modal-add"><span>Add to favorite</span></button>
			  </div>
			</div>
		  `;
  });
  modalContainer.innerHTML = modalHtml;
}

renderModal();

document.querySelectorAll(".view-menu-meals-item-des").forEach((product) => {
  product.onclick = () => {
    const name = product.getAttribute("data-name");
    document
      .querySelectorAll(".menu-view-menu-modal-content-des")
      .forEach((content) => {
        if (content.getAttribute("data-target") === name) {
          content.style.display = "flex";
        } else {
          content.style.display = "none";
        }
      });

    modalContainer.style.display = "flex";
  };
});

document.querySelectorAll(".modal-close-des").forEach((closeButton) => {
  closeButton.onclick = () => {
    modalContainer.style.display = "none";
    document
      .querySelectorAll(".menu-view-menu-modal-content-des")
      .forEach((content) => {
        content.style.display = "none";
      });
  };
});

modalContainer.onclick = (event) => {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
    document
      .querySelectorAll(".menu-view-menu-modal-content")
      .forEach((content) => {
        content.style.display = "none";
      });
  }
};

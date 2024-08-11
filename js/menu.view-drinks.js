const modalContainer = document.querySelector("#modal-container-dr");

const response = await fetch("api/drinks-menu.json");
const drinks = await response.json();
const leftColumn = document.getElementById("left-column-dr");
const rightColumn = document.getElementById("right-column-dr");

let leftItems = "";
let rightItems = "";

drinks.forEach((drink, index) => {
  const itemHtml = `
		<div class="view-menu-meals-item" data-name="${drink.name}">
		  <div class="view-menu-meals-item-img">
			<img src="${drink.img}" alt="${drink.name}" />
		  </div>
		  <div class="view-menu-meals-item-text">
			<div class="view-menu-meals-item-container">
			  <h2 class="view-menu-meals-item-title">${drink.name}</h2>
			  <div class="view-menu-meals-item-line"></div>
			  <p class="view-menu-meals-item-price">$${drink.price}</p>
			</div>
			<p class="view-menu-meals-item-desc">${drink.description}</p>
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
  drinks.forEach((drinks) => {
    modalHtml += `
			  <div class="menu-view-menu-modal-content" data-target="${drinks.name}">
				<div class="modal-close close-modal" title="Close">
				  <img
					class="modal-close close-modal"
					src="img/book-and-offer/icons-close.png"
					alt="Close icon"
				  />
				</div>
				<div class="menu-view-menu-modal-img">
				  <img
					src="${drinks.img}"
					alt="${drinks.name}"
				  />
				</div>
				<div class="menu-view-menu-modal-text">
				  <h2 class="menu-view-menu-modal-title">${drinks.name}</h2>
				  <p class="menu-view-menu-modal-desc">
					${drinks.description}
				  </p>
				  <p class="menu-view-menu-modal-ingridients">
					<span>Ingredients:</span> ${drinks.ingredients.join(", ")}
				  </p>
				  <p class="menu-view-menu-modal-weight"><span>Volume:</span> ${
            drinks.volume
          } ml</p>
				  <p class="menu-view-menu-modal-price">$${drinks.price}</p>
				  <button class="menu-view-menu-modal-add"><span>Add to favorite</span></button>
				</div>
			  </div>
			`;
  });
  modalContainer.innerHTML = modalHtml;
}

renderModal();

document.querySelectorAll(".view-menu-meals-item").forEach((product) => {
  product.onclick = () => {
    const name = product.getAttribute("data-name");
    document
      .querySelectorAll(".menu-view-menu-modal-content")
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

document.querySelectorAll(".modal-close").forEach((closeButton) => {
  closeButton.onclick = () => {
    modalContainer.style.display = "none";
    document
      .querySelectorAll(".menu-view-menu-modal-content")
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

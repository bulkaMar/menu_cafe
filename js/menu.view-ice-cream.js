const modalContainer = document.querySelector("#modal-container-ice");
const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");

const response = await fetch("api/ice-cream-menu.json");
const ice_creams = await response.json();

let leftItems = "";
let rightItems = "";

ice_creams.forEach((ice_cream, index) => {
  const itemHtml = `
		<div class="view-menu-meals-item-ice" data-name="${ice_cream.name}">
		  <div class="view-menu-meals-item-img">
			<img src="${ice_cream.img}" alt="${ice_cream.name}" />
		  </div>
		  <div class="view-menu-meals-item-text">
			<div class="view-menu-meals-item-container">
			  <h2 class="view-menu-meals-item-title">${ice_cream.name}</h2>
			  <div class="view-menu-meals-item-line"></div>
			  <p class="view-menu-meals-item-price">$${ice_cream.price}</p>
			</div>
			<p class="view-menu-meals-item-desc">${ice_cream.description}</p>
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
  ice_creams.forEach((ice_cream) => {
    modalHtml += `
		  <div class="menu-view-menu-modal-content-ice" data-target="${ice_cream.name}">
			<div class="modal-close-ice close-modal-ice" title="Close">
			  <img
				class="modal-close-ice close-modal-ice"
				src="img/book-and-offer/icons-close.png"
				alt="Close icon"
			  />
			</div>
			<div class="menu-view-menu-modal-img">
			  <img
				src="${ice_cream.img}"
				alt="${ice_cream.name}"
			  />
			</div>
			<div class="menu-view-menu-modal-text">
			  <h2 class="menu-view-menu-modal-title">${ice_cream.name}</h2>
			  <p class="menu-view-menu-modal-desc">
				${ice_cream.description}
			  </p>
			  <p class="menu-view-menu-modal-ingridients">
				<span>Ingredients:</span> ${ice_cream.ingredients.join(", ")}
			  </p>
			  <p class="menu-view-menu-modal-weight"><span>Weight:</span> ${
          ice_cream.weight
        } grams</p>
			  <p class="menu-view-menu-modal-price">$${ice_cream.price}</p>
			  <button class="menu-view-menu-modal-add"><span>Add to favorite</span></button>
			</div>
		  </div>
		`;
  });
  modalContainer.innerHTML = modalHtml;
}

renderModal();

document.querySelectorAll(".view-menu-meals-item-ice").forEach((product) => {
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

    modalContainer.style.display = "flex";
  };
});

document.querySelectorAll(".modal-close-ice").forEach((closeButton) => {
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

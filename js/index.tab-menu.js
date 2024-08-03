const tabs = document.querySelectorAll(".our-menu__tab-box-btn");
const allContent = document.querySelectorAll(".our-menu__content-menu");

const menuFiles = [
  "api/desserts-menu.json",
  "api/ice-cream-menu.json",
  "api/drinks-menu.json",
];

function loadMenuData(index) {
  fetch(menuFiles[index])
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayMenu(data, index);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Display the menu items in the content area
function displayMenu(data, index) {
  const content = allContent[index];
  content.innerHTML = ""; // Clear the current content

  data.forEach((item) => {
    const itemHTML = `
      <div class="our-menu__content-menu-item">
        <img src="${item.img}" alt="${item.name}" class="menu-item__img"/>
        <p class="our-menu__content-menu-item-title">
          ${item.name} /
          <span class="our-menu__content-menu-item-price">$${item.price}</span>
        </p>
      </div>
    `;
    content.innerHTML += itemHTML;
  });
}

// Add event listeners to each tab
tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    // Activate the selected tab
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");

    // Move the line under the active tab
    let line = document.querySelector(".line");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    // Deactivate all content sections and activate the selected one
    allContent.forEach((content) => {
      content.classList.remove("active");
    });
    allContent[index].classList.add("active");

    // Load the menu data from the corresponding JSON file
    loadMenuData(index);
  });
});

// Load the first menu by default
loadMenuData(0);

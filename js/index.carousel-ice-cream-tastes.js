const response = await fetch("api/ice-cream-tastes.json");
const ice_creams = await response.json();
console.log(ice_creams); 

const slidesContainer = document.getElementById("iceCreamSlides");
let tastesHtml = "";

ice_creams.forEach((ice_cream) => {
  tastesHtml += `
      <div class="ice-cream-tastes__slide">
        <img src="${ice_cream.image}" alt="Ice cream ${ice_cream.title}">
        <p class="ice-cream-tastes__slide-title">${ice_cream.title}</p>
        <p class="ice-cream-tastes__slide-description">${ice_cream.description}</p>
        <p class="ice-cream-tastes__slide-price">${ice_cream.price} <span>/ ball</span></p>
      </div>
    `;
});

slidesContainer.innerHTML = tastesHtml;

const carousel = document.querySelector(".ice-cream-tastes__slides");
const prevButtons = document.querySelectorAll(".ice-cream-tastes__btn-prev");
const nextButtons = document.querySelectorAll(".ice-cream-tastes__btn-next");

if (carousel && carousel.querySelector(".ice-cream-tastes__slide")) {
  const firstCardWidth = carousel.querySelector(".ice-cream-tastes__slide").offsetWidth;
  
  let cardPreview = Math.round(carousel.offsetWidth / firstCardWidth);
  const carouselChildren = [...carousel.children];

  carouselChildren.slice(-cardPreview).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  carouselChildren.slice(0, cardPreview).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  prevButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft -= firstCardWidth + 20;
    });
  });

  nextButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += firstCardWidth + 20; 
    });
  });

  const infiniteScroll = () => {
    if (carousel.scrollLeft <= 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  carousel.addEventListener("scroll", infiniteScroll);

} else {
  console.error("Carousel or slides not found.");
}
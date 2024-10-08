function init() {
  import("./header.js");
  import("./index.carousel-ice-cream-tastes.js");
  import("./index.tab-menu.js");
  import("./index.modal-booking.js");
  import("./index.book-table.js");
  import("./index.info-about-discount.js");
  import("./cart.js");
  import("./menu.view-ice-cream.js");
  import("./menu.view-desserts.js");
  import("./menu.view-drinks.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});

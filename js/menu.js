function init() {
	import("./header-menu.js");
	import("./menu.view-ice-cream.js");
  import("./menu.view-desserts.js");
  import("./menu.view-drinks.js");
  import("./menu.modal-ice-cream.js");
  }
  
  const totalPartials = document.querySelectorAll(
	'[hx-trigger="load"], [data-hx-trigger="load"]'
  ).length;
  let loadedPartialsCount = 0;
  
  document.body.addEventListener("htmx:afterOnLoad", () => {
	loadedPartialsCount++;
	if (loadedPartialsCount === totalPartials) init();
  });
  
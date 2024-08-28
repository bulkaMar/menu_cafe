function init() {
    console.log("init викликано");

    import("./alertSubmit.js")
        .then(module => {
            console.log("alertSubmit.js завантажено");
            return import("./modalDiscount.js");
        })
        .then(module => {
            console.log("modalDiscount.js завантажено");
            return import("./checkout-order.js");
        })
        .then(module => {
            console.log("checkout-order.js завантажено");
        })
        .catch(error => console.error("Error loading modules:", error));
}

document.body.addEventListener("htmx:afterOnLoad", () => {
    init();
});

setTimeout(() => {
  const event = new Event("htmx:afterOnLoad");
  document.body.dispatchEvent(event);
});

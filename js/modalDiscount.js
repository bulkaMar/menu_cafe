export function showModalDiscount(message, newPrice) {
    const discountAlert = document.querySelector(".discount-alert");
    const closeModal = document.querySelector(".modal-close");
    const overlay = document.querySelector(".overlay");

    if (discountAlert) {
        const discountText = discountAlert.querySelector(".discount-alert-text");
        const newPriceElement = discountAlert.querySelector(".discount-alert-newPrice span");

        if (discountText && newPriceElement) {
            discountText.textContent = message;
            newPriceElement.textContent = `$${newPrice.toFixed(2)}`;

            discountAlert.style.display = "block";
            overlay.style.display = "block";

            if (closeModal) {
                closeModal.addEventListener("click", () => {
                    discountAlert.style.display = "none";
                    overlay.style.display = "none";
                });
            }
        }
    }
    setTimeout(() => {
        discountAlert.style.display = "none";
        overlay.style.display = "none";
    }, 5000);
}

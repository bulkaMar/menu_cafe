const showModal = (
  openButtonId,
  modalId,
  contentSelector,
  contentFooter,
  contentMenu,
  contentSvg
) => {
  const openBtn = document.getElementById(openButtonId);
  const modalContainer = document.getElementById(modalId);
  const mainContent = document.querySelector(contentSelector);
  const ourMenu = document.querySelector(contentMenu);
  const footerContent = document.querySelector(contentFooter);
  const svgWave = document.querySelector(contentSvg);

  if (
    openBtn &&
    modalContainer &&
    mainContent &&
    ourMenu &&
    footerContent &&
    svgWave
  ) {
    openBtn.addEventListener("click", () => {
      modalContainer.classList.add("show-modal");
      ourMenu.classList.add("blur-background");
      footerContent.classList.add("blur-background");
      mainContent.classList.add("blur-background");
      svgWave.classList.add("blur-background");
      document.body.classList.add("no-scroll");
    });
  } else {
    console.error("One or more elements are missing.");
  }
};

showModal(
  "open-modal",
  "modal-container",
  ".book-and-offer__content",
  ".footer",
  ".our-menu",
  ".svg-wave"
);

const closeModal = () => {
  const modalContainer = document.getElementById("modal-container");
  const mainContent = document.querySelector(".book-and-offer__content");
  const ourMenu = document.querySelector(".our-menu");
  const footerContent = document.querySelector(".footer");
  const svgWave = document.querySelector(".svg-wave");

  if (modalContainer && mainContent && ourMenu && footerContent && svgWave) {
    modalContainer.classList.remove("show-modal");
    mainContent.classList.remove("blur-background");
    ourMenu.classList.remove("blur-background");
    footerContent.classList.remove("blur-background");
    svgWave.classList.remove("blur-background");
    document.body.classList.remove("no-scroll");
  } else {
    console.error("One or more elements are missing.");
  }
};

const closeBtns = document.querySelectorAll(".close-modal");
closeBtns.forEach((c) => c.addEventListener("click", closeModal));

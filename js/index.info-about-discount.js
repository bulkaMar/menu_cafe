const closeBtn = document.querySelector('.offer-modal-modal-close');
const overlay = document.querySelector('.overley-index');
const learnMoreBtn = document.querySelector('.special-offer__content-btn');
const offerModal = document.querySelector('.offer-modal');

learnMoreBtn.addEventListener('click', (event) => {
	event.preventDefault();
	offerModal.style.display = 'block';
	overlay.style.display = 'block';
});

closeBtn.addEventListener('click', (event) =>{
	event.preventDefault();
	offerModal.style.display = 'none';
	overlay.style.display = 'none';
});

export function showAlertSubmit() {
	const submitedData = document.querySelector(".submit-data");
  
	if (submitedData) {
	  submitedData.style.display = "flex";
		setTimeout(() => {
		  submitedData.style.display = "none";
		}, 2000); 
	} else {
	  console.error("Element with class 'submit-data' not found.");
	}
  }
  
const form = document.getElementById("reservation__form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("reservation__form-status");
  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: new FormData(event.target),
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset();
      setTimeout(() => {
        status.classList.add("fade-out");
      }, 1000);
      setTimeout(() => {
        status.innerHTML = "";
        status.classList.remove("fade-out");
      }, 2000);
    } else {
      status.innerHTML = "Oops! There was a problem submitting your form";
    }
  } catch {
    status.innerHTML = "Oops! There was a problem submitting your form";
  }
}
form.addEventListener("submit", handleSubmit);

//modal windows
function openModal(num) {
  document.getElementById("modal" + num).style.display = "flex";
}

function closeModal(num) {
  document.getElementById("modal" + num).style.display = "none";
}

function redirectToPage() {
  window.location.href = "payment_comfirmation.html";
}

//other
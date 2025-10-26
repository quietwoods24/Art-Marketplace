//modal windows
function openModal(num) {
  document.getElementById("modal" + num).style.display = "flex";
}

function closeModal(num) {
  document.getElementById("modal" + num).style.display = "none";
}

function redirectToPaymentPage() {
  window.location.href = "payment_comfirmation.html";
}

//other
function redirectToArtistPage() {
  window.location.href = "artist_page.html";
}
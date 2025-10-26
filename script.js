//modal windows
function openModal(num) {
  document.getElementById("modal" + num).style.display = "flex";
}

function closeModal(num) {
  document.getElementById("modal" + num).style.display = "none";
}

function redirectToPaymentPage() {
  sessionStorage.setItem('referrerURL', window.location.href); //зберігти з якої сторінки переходять на оплату
  window.location.href = "payment_confirmation.html";
}

//other
function redirectToArtistPage() {
    window.location.href = "artist_page.html";
}

function openSuccessModal(){
    document.getElementById("successModal").style.display = "flex";
}

function closeSuccessModal(){
    document.getElementById("successModal").style.display = "none";
    returnToReferrer();
}

function returnToReferrer() {
    const referrerURL = sessionStorage.getItem('referrerURL');
    if (referrerURL) {
        sessionStorage.removeItem('referrerURL');
        window.location.href = referrerURL;
    } else {
        window.location.href = 'index.html'; 
    }
}

function redirectToPurchasePage() {
    window.location.href = "purchases.html";
}
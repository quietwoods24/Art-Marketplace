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
    document.getElementById("myProgress").style.display = "none";
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

//progress bar
var i = 0;
function move() {
  document.getElementById("myProgress").style.display = "flex";  
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        openSuccessModal();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
var firebaseConfig = {
  apiKey: "AIzaSyBfmZB0ZmhXTX50Hp5fF0aZaynvXTc_IbE",
  authDomain: "wd-sv-76-2022.firebaseapp.com",
  databaseURL: "https://wd-sv-76-2022-default-rtdb.firebaseio.com",
  projectId: "wd-sv-76-2022",
  storageBucket: "wd-sv-76-2022.appspot.com",
  messagingSenderId: "880484813299",
  appId: "1:880484813299:web:1d15360487b9152889ea86"
};

var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../index.html";

document.querySelector("#show-login").addEventListener("click", function(){
  document.querySelector("#prijavljivanje").classList.add("active");
});

document.querySelector("#zatvorilog").addEventListener("click", function(){
  document.querySelector("#prijavljivanje").classList.remove("active");
});  

document.querySelector("#prijavi").addEventListener("click", function() {    
  var korisnikError = document.querySelector("#korisnickoime-error");
  var passwordError = document.querySelector("#password-error");
  var greska = document.querySelector('#prijavise');
    
    // Resetujem prethodne poruke o greškama
  korisnikError.textContent = "";
  passwordError.textContent = "";
  greska.textContent = "";
    
  var korisnik = document.getElementById('korime').value;
  var lozinka = document.getElementById('password').value;

  if ((validate_korisnik(korisnik)) == false || validate_password(lozinka) == false || postoji(korisnik, lozinka) == false){
    greska.textContent = "Nepostojece/nije uneto korisnicko ime ili lozinka. Pokusajte ponovo.";
    return;
  } 
});

function validate_korisnik(korisnik){
  var korisnikError = document.querySelector("#korisnickoime-error");

  if (korisnik.trim() == "") {
    korisnikError.textContent = "Molimo unesite Vaše korisnicko ime.";
    return false;
  } else {
    return true;
  }
}

function validate_password(lozinka){
  var passwordError = document.querySelector("#password-error");

  if (lozinka.trim() == "") {
    passwordError.textContent = "Molimo unesite lozinku.";
    return false;
  } else {
    return true;
  }
}

function postoji(korisnik, lozinka){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var korisnici = JSON.parse(request.responseText);
          for (var id in korisnici){
            var user = korisnici[id];
            if (user.korisnickoIme == korisnik && user.lozinka == lozinka){
              document.getElementById('korime').value = '';
              document.getElementById('korime').placeholder = 'Unesite korisnicko ime';
              document.getElementById('password').value = '';
              document.getElementById('password').placeholder = 'Unesite lozinku';
              document.querySelector(".popup").classList.remove("active");
              return true;
            }
          }
          var greska = document.querySelector('#prijavise');

          greska.textContent = "Pogresno korisnicko ime ili lozinka. Pokusajte ponovo.";
          document.getElementById('korime').value = '';
          document.getElementById('korime').placeholder = 'Unesite korisnicko ime';
          document.getElementById('password').value = '';
          document.getElementById('password').placeholder = 'Unesite lozinku';
          return false;
        }
      }
    }        
    request.open('GET', firebaseUrl + '/korisnici/.json');
    request.send();
}

$(document).ready(function() {
  $('#dugmence').on('click', function() {
    $('.navbar-collapse').toggleClass('show');
  });
});
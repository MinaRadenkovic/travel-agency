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

document.querySelector("#show-reg").addEventListener("click", function(){
  document.querySelector("#registracija").classList.add("active");
});

document.querySelector("#zatvorireg").addEventListener("click", function() {
  document.querySelector("#registracija").classList.remove("active");
});
  
document.querySelector("#registruj").addEventListener('click', function(){
  var korisnickoImeError = document.querySelector("#korisnickoimereg-error");
  var passwordError = document.querySelector("#lozinkareg-error");
  var greska = document.querySelector('#registrujse');
  var imeError = document.querySelector('#ime-error');
  var prezimeError = document.querySelector('#prezime-error');
  var brojError = document.querySelector('#telefon-error');
  var datumError = document.querySelector('#datum-error');
  var emailError = document.querySelector('#mejl-error');
  var adresaError = document.querySelector('#adresa-error');

  korisnickoImeError.textContent = "";
  passwordError.textContent = "";
  greska.textContent = "";
  prezimeError.textContent = "";
  brojError.textContent = "";
  datumError.textContent = "";
  emailError.textContent = "";
  adresaError.textContent = "";
  imeError.textContent = "";

  var ime = document.getElementById('ime').value;
  var lozinka = document.getElementById('lozinkareg').value;
  var prezime = document.getElementById('prezime').value;
  var broj = document.getElementById('telefon').value;
  var datum = document.getElementById('datumRodjenja').value;
  var email = document.getElementById('mejl').value;
  var adresa = document.getElementById('adresa').value;
  var korisnickoIme = document.getElementById('korimereg').value;

  if (validate_ime(ime) == false || 
    validate_prezime(prezime) == false || 
    validate_lozinka(lozinka) == false || 
    validate_broj(broj) == false ||
    validate_datum(datum) == false ||
    validate_mejl(email) == false ||
    validate_adresa(adresa) == false ||
    validate_korisnickoIme(korisnickoIme) == false){
    greska.textContent = "Neuspela registracija. Pokusajte ponovo.";

    return;
  } else {
    document.querySelector(".popup").classList.remove("active");

    ime = velikoSlovo(ime);
    prezime = velikoSlovo(prezime);

    var noviKorisnik = {adresa: adresa,
                        datumRodjenja: datum,
                        email: email,
                        ime: ime,
                        korisnickoIme: korisnickoIme,
                        lozinka: lozinka,
                        prezime: prezime,
                        telefon: broj};
    var jsonData = JSON.stringify(noviKorisnik);
    var postRequest = new XMLHttpRequest();
    postRequest.onreadystatechange = function(){
      if (this.readyState == 4) {
        if (this.status == 200) {
        }
      }
    }
    postRequest.open("POST", firebaseUrl + "/korisnici/.json", true);
    postRequest.send(jsonData);
    
    document.getElementById('ime').value = "";
    document.getElementById('lozinkareg').value = "";
    document.getElementById('prezime').value = "";
    document.getElementById('telefon').value = "";
    document.getElementById('datumRodjenja').value = "";
    document.getElementById('mejl').value = "";
    document.getElementById('adresa').value = "";
    document.getElementById('korimereg').value = "";
    return true;
  } 
})
  
function validate_ime(name){
  var imeError = document.querySelector("#ime-error");
  
  if (name.trim() == ""){
    imeError.textContent = "Molimo unesite Vaše ime.";
    return false;
  } else if (/^[a-zA-Z]+$/.test(name)){
    return true;
  } else {
    imeError.textContent = "Ime je neispravno uneseno.";
  }
}
  
function validate_prezime(name){
  var prezimeError = document.querySelector("#prezime-error");
  
  if (name.trim() == ""){
    prezimeError.textContent = "Molimo unesite Vaše prezime.";
    return false;
  } else if (/^[a-zA-Z]+$/.test(name)){
    return true;
  } else {
    prezimeError.textContent = "Prezime je neispravno uneseno.";
  }
}
  
function validate_lozinka(lozinka){
  var lozinkaError = document.querySelector("#lozinkareg-error");
  
  if (lozinka.trim() == ""){
    lozinkaError.textContent = "Molimo unesite lozinku.";
  } else if (/^(?=.*[a-zA-Z])(?=.*\d).{4,}$/.test(lozinka)){
    return true;
  } else {
    lozinkaError.textContent = "Lozinka je nepotpuna.";
  }
}
  
function validate_adresa(adresa){
  var adresaError = document.querySelector("#adresa-error");
  
  if (adresa.trim() == ""){
    adresaError.textContent = "Molimo unesite adresu.";
    return false;
  } else {
    return true;
  }
}
  
function validate_broj(telefon){
  var telefonError = document.querySelector("#telefon-error");
  
  if (telefon.trim() == ""){
    telefonError.textContent = "Molimo unesite Vaš broj telefona.";
    return false;
  } else if ((/^\d{9,10}$/).test(telefon)){
    return true;
  } else {
    telefonError.textContent = "Telefon nije ispravno unet.";
    return false;
  }
}
  
function validate_datum(datum){
  var datumError = document.querySelector("#datum-error");
  var danas = new Date();
  danas.setHours(0,0,0,0);
  var datumrodjenja = new Date(datum);
  
  if (datum.trim() == ""){
    datumError.textContent = "Molimo unesite Vaš datum rođenja.";
    return false;
  } else if(datumrodjenja > danas){
    datumError.textContent = "Unet datum nije ispravan. Pokušajte ponovo.";
    return false;
  } else {
    return true;
  }
}
  
function validate_mejl(email){
  var emailError = document.querySelector("#mejl-error");
  
  if (email.trim() == ""){
    emailError.textContent = "Molimo unesite email.";
    return false;
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    return true;
  } else {
    emailError.textContent = "Email nije dobro unet.";
    return false;
  }
}
  
function validate_korisnickoIme(korisnickoIme){
  var korisnickoImeError = document.querySelector("#korisnickoimereg-error");
  var validno = false;

  if (korisnickoIme.trim() == ""){
      korisnickoImeError.textContent = "Molimo izaberite Vaše korisničko ime.";
      return validno;
  }else{
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            var korisnici = JSON.parse(request.responseText);
            for (var id in korisnici){
              var user = korisnici[id];
              if (user.korisnickoIme == korisnickoIme){
                break;
              } else {
                document.querySelector("#registracija").classList.remove("active");
                return true;
              }
            }
            korisnickoImeError.textContent = "Uneto korisnicko ime vec postoji. Pokušajte ponovo.";
            var greska = document.getElementById("registrujse");
            greska.textContent = "Neuspela registracija. Pokusajte ponovo.";
            return false;
          } 
        }
      }
      request.open('GET', firebaseUrl + '/korisnici/.json');
      request.send();
  } 
}

function velikoSlovo(rec){
  return rec.charAt(0).toUpperCase() + rec.slice(1);
}
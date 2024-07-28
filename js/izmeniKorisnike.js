var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../izmeniKorisnike.html";

const id = window.location.search;
const ajdi = id.substring(4);

let korisnik = {};
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
    if(this.readyState==4){
        if(this.status==200){
          korisnik = JSON.parse(this.responseText);    
          setFormData(korisnik);
        }
    }
}
getRequest.open('GET',firebaseUrl +'/korisnici/' + ajdi +'.json');
getRequest.send();

let editForm = document.getElementById('editForm');
editForm.addEventListener('submit',function(e){

    e.preventDefault();

    var korisnickoImeError = document.querySelector("#korisnickoimereg-greska");
    var passwordError = document.querySelector("#lozinkareg-greska");
    var greska = document.querySelector('#izmeni');
    var imeError = document.querySelector('#ime-greska');
    var prezimeError = document.querySelector('#prezime-greska');
    var brojError = document.querySelector('#telefon-greska');
    var datumError = document.querySelector('#datum-greska');
    var emailError = document.querySelector('#mejl-greska');
    var adresaError = document.querySelector('#adresa-greska');
  
    korisnickoImeError.textContent = "";
    passwordError.textContent = "";
    greska.textContent = "";
    prezimeError.textContent = "";
    brojError.textContent = "";
    datumError.textContent = "";
    emailError.textContent = "";
    adresaError.textContent = "";
    imeError.textContent = "";
  
    let ime = document.getElementById('imeIzmena').value.trim();
    let prezime = document.getElementById('prezimeIzmena').value.trim();
    let email = document.getElementById('emailIzmena').value.trim();
    let adresa = document.getElementById('adresaIzmena').value.trim();
    let datum = document.getElementById('datumRodjenjaIzmena').valueAsDate;
    let telefon = document.getElementById('telefonIzmena').value;
    let korisnickoIme = document.getElementById('korisnickoImeIzmena').value.trim();
    let lozinka = document.getElementById('lozinkaIzmena').value.trim();

    if ((ime!='')&&(/^[a-zA-Z]+$/.test(ime))){
        korisnik.ime = ime;
    } else {
        imeError.textContent = "Ime je neispravno uneseno.";
    }

    if ((prezime!='')&&(/^[a-zA-Z]+$/.test(prezime))){
        korisnik.prezime = prezime;
    } else {
        prezimeError.textContent = "Prezime je neispravno uneseno.";
    }

    if ((email!='')&&(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
        korisnik.email = email;
    } else {
        emailError.textContent = "Email je neispravno unesen.";
    }

    if ((adresa!='')&&(/^[a-zA-Z]+$/.test(adresa))){
        korisnik.adresa = adresa;
    } else {
        adresaError.textContent = "Adresa je neispravno unesena.";
    }

    var danas = new Date();
    danas.setHours(0,0,0,0);
    var datumrodjenja = new Date(datum);
  
    if (datumrodjenja < danas){
        korisnik.datumRodjenja = document.getElementById('datumRodjenjaIzmena').value;
    } else {
      datumError.textContent = "Unet datum nije ispravan.";
    }  

    if (telefon !== "" && (!isNaN(telefon))) {
        let brojTelefona = telefon.toString();
        if (brojTelefona.length === 9 || brojTelefona.length === 10){
            korisnik.telefon = telefon;
        } else {
            brojError.textContent = "Telefon nije ispravno unet.";
        }
    } else {
        brojError.textContent = "Telefon nije ispravno unet.";
    }

    if ((korisnickoIme!='')&&(/^[a-zA-Z]+$/.test(korisnickoIme))){
        korisnik.korisnickoIme = korisnickoIme;
    } else {
        korisnickoImeError.textContent = "Korisnicko ime je neispravno uneseno.";
    }

    if ((lozinka!='')&&(/^(?=.*[a-zA-Z])(?=.*\d).{4,}$/.test(lozinka))){
        korisnik.lozinka = lozinka;
    } else {
        passwordError.textContent = "Lozinka je neispravno unesena.";
    }

    if (korisnickoImeError.textContent == "" && passwordError.textContent == ""&&
        greska.textContent == "" && prezimeError.textContent == "" &&
        brojError.textContent == "" && datumError.textContent == "" &&
        emailError.textContent == "" && adresaError.textContent == "" && imeError.textContent == ""){
  
        let putRequest = new XMLHttpRequest();
    
        putRequest.onreadystatechange = function(e){
    
            if(this.readyState==4){
                if(this.status==200){
                window.location.href="admin.html";
                }
            }
        }
        putRequest.open('PUT',firebaseUrl.concat('/korisnici/',ajdi,'.json'));
        putRequest.send(JSON.stringify(korisnik));
    }else {
        greska.textContent = "Neispravna izmena. Pokušajte ponovo.";
    }
})

function setFormData(korisnik){

    let imeInput = document.getElementById('imeIzmena');
    imeInput.value = korisnik.ime;
  
    let prezimeInput = document.getElementById('prezimeIzmena');
    prezimeInput.value = korisnik.prezime;
  
    let emailInput = document.getElementById('emailIzmena');
    emailInput.value = korisnik.email;
  
    let adresaInput = document.getElementById('adresaIzmena');
    adresaInput.value = korisnik.adresa;
    
    let datumInput = document.getElementById('datumRodjenjaIzmena');
    datumInput.value = korisnik.datumRodjenja;    
    
    let telefonInput = document.getElementById('telefonIzmena');
    telefonInput.value = korisnik.telefon;

    let korImeInput = document.getElementById('korisnickoImeIzmena');
    korImeInput.value = korisnik.korisnickoIme;

    let lozinkaInput = document.getElementById('lozinkaIzmena');
    lozinkaInput.value = korisnik.lozinka;
}
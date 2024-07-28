var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../izmeniAgencije.html";

const id = window.location.search;
const ajdi = id.substring(4);

let agencija = {};
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function () {
    if(this.readyState==4){
        if(this.status==200){
          agencija = JSON.parse(this.responseText);    
          setFormData(agencija);
        }
    }
}
getRequest.open('GET',firebaseUrl +'/agencije/' + ajdi +'.json');
getRequest.send();

let editForm = document.getElementById('editForm');
editForm.addEventListener('submit',function(e){

    e.preventDefault();

    var nazivError = document.querySelector("#naziv-greska");
    var greska = document.querySelector('#izmeni');
    var godinaError = document.querySelector('#godina-greska');
    var logoError = document.querySelector('#logo-greska');
    var brojError = document.querySelector('#telefon-greska');
    var emailError = document.querySelector('#mejl-greska');
    var adresaError = document.querySelector('#adresa-greska');
  
    nazivError.textContent = "";
    greska.textContent = "";
    godinaError.textContent = "";
    logoError.textContent = "";
    brojError.textContent = "";
    emailError.textContent = "";
    adresaError.textContent = "";
  
    let naziv = document.getElementById('nazivIzmena').value.trim();
    let email = document.getElementById('emailIzmena').value.trim();
    let adresa = document.getElementById('adresaIzmena').value.trim();
    let godina = document.getElementById('godina').valueAsNumber;
    let telefon = document.getElementById('telefonIzmena').value;
    let logo = document.getElementById('logoIzmena').value.trim();

    if ((naziv!='')){
        agencija.naziv = naziv;
    } else {
        nazivError.textContent = "Naziv agencije je neispravno uneseno.";
    }

    if ((email!='')&&(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
        agencija.email = email;
    } else {
        emailError.textContent = "Email je neispravno unesen.";
    }

    if ((adresa!='')){
        agencija.adresa = adresa;
    } else {
        adresaError.textContent = "Adresa je neispravno unesena.";
    }

    if (!isNaN(godina) && godina <= 2023) {
        let god = godina.toString();
        agencija.godina = god;
    } else {
        godinaError.textContent = "Godina otvaranja je neispravna.";
    }
    

    if (telefon !== "" && !(/[a-zA-Z]/.test(telefon))) {
        agencija.brojTelefona = telefon;
    } else {
        brojError.textContent = "Telefon nije ispravno unet.";
    }

    logoError.textContent = "Logo nije validan.";
    let zavrsetak = [".jpg", ".jpeg", ".png"];
    for (let i=0; i<zavrsetak.length; i++){
        if (logo.endsWith(zavrsetak[i])){
            agencija.logo = logo;
            logoError.textContent = "";
            break;
        } 
    }

    if (nazivError.textContent == "" && greska.textContent == "" && 
        brojError.textContent == "" && godinaError.textContent == "" &&
        emailError.textContent == "" && adresaError.textContent == "" && logoError.textContent == ""){
  
        let putRequest = new XMLHttpRequest();
    
        putRequest.onreadystatechange = function(e){
            if(this.readyState==4){
                if(this.status==200){
                window.location.href="admin.html";
                }
            }
        }
        putRequest.open('PUT',firebaseUrl.concat('/agencije/',ajdi,'.json'));
        putRequest.send(JSON.stringify(agencija));
    }else {
        greska.textContent = "Neispravna izmena. Pokušajte ponovo."
    }
})

function setFormData(agencija){

    let nazivInput = document.getElementById('nazivIzmena');
    nazivInput.value = agencija.naziv;
  
    let emailInput = document.getElementById('emailIzmena');
    emailInput.value = agencija.email;
  
    let adresaInput = document.getElementById('adresaIzmena');
    adresaInput.value = agencija.adresa;
    
    let godinaInput = document.getElementById('godina');
    godinaInput.value = agencija.godina;    
    
    let telefonInput = document.getElementById('telefonIzmena');
    telefonInput.value = agencija.brojTelefona;

    let logoInput = document.getElementById('logoIzmena');
    logoInput.value = agencija.logo;

    var link = document.createElement('a');    
    link.href = "izmenaDestinacija.html?id=" + agencija.destinacije;

    var paragraph = document.createElement('p');
    paragraph.id = "izmeni";
    paragraph.textContent = "Izmena destinacija";

    link.appendChild(paragraph);
    var div = document.getElementById('dest');
    div.appendChild(link);
};  
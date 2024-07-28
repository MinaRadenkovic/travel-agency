var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../editDest.html";

const id = window.location.search;
const ajdi = id.substring(4);

let destinacija = {};
let getRequest = new XMLHttpRequest();
getRequest.onreadystatechange = function () {
    if(this.readyState==4){
        if(this.status==200){
          destinacija = JSON.parse(this.responseText);    
          setFormData(destinacija);
        }
    }
}
getRequest.open('GET',firebaseUrl +'/destinacije/' + ajdi +'.json');
getRequest.send();

let editForm = document.getElementById('editForm');
editForm.addEventListener('submit',function(e){

    e.preventDefault();

    var cenaError = document.querySelector("#cena-greska");
    var maxOsobaError = document.querySelector("#maxOsoba-greska");
    var greska = document.querySelector('#izmeni');
    var nazivError = document.querySelector('#nazivDest-greska');
    var opisError = document.querySelector('#opisDest-greska');
    var prevozError = document.querySelector('#prevoz-greska');
    var slikeError = document.querySelector('#slika-greska');
  
    cenaError.textContent = "";
    maxOsobaError.textContent = "";
    greska.textContent = "";
    nazivError.textContent = "";
    opisError.textContent = "";
    prevozError.textContent = "";
    slikeError.textContent = "";
  
    let cena = document.getElementById('cenaIzmena').value.trim();
    let maxOsoba = document.getElementById('maxOsobaIzmena').value.trim();
    let naziv = document.getElementById('nazivDestIzmena').value.trim();
    let opis = document.getElementById('opisDestIzmena').value.trim();
    let prevoz = document.getElementById('prevozIzmena').value.trim();
    let slike = document.getElementById('slikaIzmena').value.trim();

    function validate_slike(slike){
        slikeError.textContent = "Slika nije ispravno unesena.";
        var listaSlika = slike.split(",");
        let zavrsetak = [".jpg", ".jpeg", ".png"];
        listaSlika.forEach(slika => {
            for (let i=0; i<zavrsetak.length; i++){
                if (slika.trim().endsWith(zavrsetak[i])){
                    slikeError.textContent = "";
                    break;
                } else {
                    slikeError.textContent = "Slika nije ispravno unesena.";
                }
            }
        })
        if (slikeError.textContent == ""){
            return true;
        } else {
            return false;
        }
    }
        
    function validate_cena(cena){       
        if (cena.trim() == ""){
            cenaError.textContent = "Molimo unesite cenu.";
            return false;
        } else if (isNaN(cena) == false){
            if (Number(cena) < 1){
                cenaError.textContent = "Cena je neispravno unesena.";
                return false;
            }
            return true;
        } else {
            cenaError.textContent = "Cena je neispravno unesena.";
            return false;
        }
    }

    function validate_maxOsoba(maxOsoba){        
        if (maxOsoba.trim() == ""){
            maxOsobaError.textContent = "Molimo unesite koji je maksimalan broj osoba.";
            return false;
        } else if (isNaN(maxOsoba) == false){
            if (Number(maxOsoba) < 1){
                maxOsobaError.textContent = "Maksimalan broj osoba je neispravno unesen.";
                return false;
            }
            return true;
        } else {
            maxOsobaError.textContent = "Maksimalan broj osoba je neispravno unesen.";
            return false;
        }
    }

    function validate_prevoz(name){        
        if (name.trim() == ""){
            prevozError.textContent = "Molimo unesite način prevoza.";
            return false;
        } else if (/^[a-zA-Z]+$/.test(name)){
            return true;
        } else {
            prevozError.textContent = "Prevoz je neispravno unesen.";
            return false;
        }
    }
        
    function validate_naziv(naziv){        
        if (naziv.trim() == ""){
            nazivError.textContent = "Molimo unesite naziv destinacije.";
            return false;
        } else {
            return true;
        }
    }

    function validate_opis(opis){        
        if (opis.trim() == ""){
            opisError.textContent = "Molimo unesite opis destinacije.";
            return false;
        } else {
            return true;
        }
    }

    if (validate_cena(cena) == true && 
        validate_maxOsoba(maxOsoba) == true &&
        validate_naziv(naziv) == true && 
        validate_prevoz(prevoz) == true &&
        validate_opis(opis) == true &&
        validate_slike(slike) == true){
        console.log(cenaError, cenaError.textContent)      

        var ajdijevi = ajdi.split("/");
        var destinacijaId = ajdijevi[0];
        window.location.href = "izmenaDestinacija.html?id=" + destinacijaId;
    }else {
        greska.textContent = "Neispravna izmena. Pokušajte ponovo.";
    }
})

function setFormData(destinacija){

    let cenaInput = document.getElementById('cenaIzmena');
    cenaInput.value = destinacija.cena;
  
    let maxOsobaInput = document.getElementById('maxOsobaIzmena');
    maxOsobaInput.value = destinacija.maxOsoba;
  
    let nazivDestInput = document.getElementById('nazivDestIzmena');
    nazivDestInput.value = destinacija.naziv;
  
    let opisDestInput = document.getElementById('opisDestIzmena');
    opisDestInput.value = destinacija.opis;
    
    let prevozInput = document.getElementById('prevozIzmena');
    prevozInput.value = destinacija.prevoz;    
    
    let slikeInput = document.getElementById('slikaIzmena');
    slikeInput.value = destinacija.slike;
}
var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../index.html";

getKorisnici();

function getKorisnici(){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(this.readyState==4){
      if(this.status==200){
        removeTableRows('sviKorisnici');
        let korisnici = JSON.parse(this.responseText);
        for(let id in korisnici){
          let korisnik = korisnici[id];
          appendKorisniciRow("sviKorisnici", id, korisnik, korisnici);
        }
      }
    }
  }
  request.open('GET',firebaseUrl.concat('/korisnici.json'));
  request.send();
}

function appendKorisniciRow(tbodyId, korisnikId, korisnik, korisnici){

  let korisnikTr = document.createElement('tr');

  let adresaTd = document.createElement('td');
  adresaTd.innerText = korisnik.adresa;
  korisnikTr.appendChild(adresaTd);

  let datumTd = document.createElement('td');
  datumTd.innerText = korisnik.datumRodjenja;
  korisnikTr.appendChild(datumTd);

  let emailTd = document.createElement('td');
  emailTd.innerText = korisnik.email;
  korisnikTr.appendChild(emailTd);

  let imeTd = document.createElement('td');
  imeTd.innerText = korisnik.ime;
  korisnikTr.appendChild(imeTd);  
  
  let korisnickoTd = document.createElement('td');
  korisnickoTd.innerText = korisnik.korisnickoIme;
  korisnikTr.appendChild(korisnickoTd);  
  
  let lozinkaTd = document.createElement('td');
  lozinkaTd.innerText = korisnik.lozinka;
  korisnikTr.appendChild(lozinkaTd);  
  
  let prezimeTd = document.createElement('td');
  prezimeTd.innerText = korisnik.prezime;
  korisnikTr.appendChild(prezimeTd);

  let telTd = document.createElement('td');
  telTd.innerText = korisnik.telefon;
  korisnikTr.appendChild(telTd);

  let poslednjiId;
  for (let id in korisnici) {
    poslednjiId = id;
  }
  if (korisnikId === poslednjiId) {
    korisnikTr.id = 'agencija';
  }

  let editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.innerText = 'Izmeni';
  editBtn.setAttribute('data-korisnikId',korisnikId);
  editBtn.onclick = showEditPage;

  let editTd = document.createElement('td');
  editTd.appendChild(editBtn);
  editBtn.classList.add("btn");
  editBtn.classList.add("btn-outline-success");
  korisnikTr.appendChild(editTd);

  let deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.classList.add("obrisi");
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-outline-success");
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "white";
  deleteBtn.innerText = 'Obrisi';
  
  deleteBtn.setAttribute('data-korisnikId', korisnikId);
  deleteBtn.addEventListener("click", function() {
    deletekorisnik(this.getAttribute("data-korisnikId")); 
  });
  
  let deleteTd = document.createElement('td');
  deleteTd.appendChild(deleteBtn);
  korisnikTr.appendChild(deleteTd);

  let tbody = document.getElementById(tbodyId);
  tbody.appendChild(korisnikTr);
}

function showEditPage(){
  let clickedBtn = this;

  let korisnikId = clickedBtn.getAttribute('data-korisnikId');
  window.location.href = 'izmeniKorisnike.html?id='+ korisnikId;
}

function deletekorisnik(korisnik) {
  let korisnikId = korisnik;
  let korisnickoIme = "";

  var popupDiv = document.createElement("div");
  popupDiv.id = "obrisipopup";
  popupDiv.className = "obrisipopup";
  popupDiv.classList.add("active");

  var contentDiv = document.createElement("div");
  contentDiv.className = "popup-content";

  var heading = document.createElement("h2");
  heading.textContent = "Obriši korisnika?";

  var paragraph = document.createElement("p");

  var requestZaKIme = new XMLHttpRequest();
  requestZaKIme.onreadystatechange = function(){
    if(this.readyState==4){
      if(this.status==200){
        let korisnici = JSON.parse(this.responseText);
        for(let id in korisnici){
          let k = korisnici[id];
          if (korisnik == id){
            korisnickoIme = k.korisnickoIme;
            break;
          }
        }
        paragraph.textContent = "Da li ste sigurni da želite da obrišete korisnika " + korisnickoIme + "?";
      }
    }
  }
  requestZaKIme.open('GET',firebaseUrl.concat('/korisnici.json'));
  requestZaKIme.send();
  
  var buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons";

  var potvrdiBtn = document.createElement("button");
  potvrdiBtn.textContent = "Potvrdi";

  potvrdiBtn.addEventListener("click", function() {
    let deleteRequest = new XMLHttpRequest();

    deleteRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          getKorisnici();
          document.getElementById("obrisipopup").classList.remove("active");
          let popupDiv = document.getElementById("obrisipopup");
          popupDiv.remove();        
        }
      }
    }
    deleteRequest.open('DELETE', firebaseUrl.concat('/korisnici/', korisnikId, '.json'));
    deleteRequest.send();
  });

  var otkaziBtn = document.createElement("button");
  otkaziBtn.textContent = "Otkaži";
  otkaziBtn.onclick = function(){
    document.getElementById("obrisipopup").classList.remove("active");
    let popupDiv = document.getElementById("obrisipopup");
    popupDiv.remove();  
  }

  buttonsDiv.appendChild(potvrdiBtn);
  buttonsDiv.appendChild(otkaziBtn);

  contentDiv.appendChild(heading);
  contentDiv.appendChild(paragraph);
  contentDiv.appendChild(buttonsDiv);

  popupDiv.appendChild(contentDiv);

  document.body.appendChild(popupDiv);
}

getAgencije();

function getAgencije(){
  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(this.readyState==4){
      if(this.status==200){
        removeTableRows('sveAgencije');
        let agencije = JSON.parse(this.responseText);
        for(let id in agencije){
          let agencija = agencije[id];
          appendAgencijaRow('sveAgencije', id, agencija);
        }
      }
    }
  }
  request.open('GET',firebaseUrl.concat('/agencije.json'));
  request.send();
}

function appendAgencijaRow(tbodyId,agencijaId,agencija){
  let agencijaTr = document.createElement('tr');

  let nazivTd = document.createElement('td');
  nazivTd.innerText = agencija.naziv;
  agencijaTr.appendChild(nazivTd);

  let adresaTd = document.createElement('td');
  adresaTd.innerText = agencija.adresa;
  agencijaTr.appendChild(adresaTd);

  let godinaTd = document.createElement('td');
  godinaTd.innerText = agencija.godina;
  agencijaTr.appendChild(godinaTd);  
  
  let brojTd = document.createElement('td');
  brojTd.innerText = agencija.brojTelefona;
  agencijaTr.appendChild(brojTd);

  let emailTd = document.createElement('td');
  emailTd.innerText = agencija.email;
  agencijaTr.appendChild(emailTd);  

  let editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.innerText = 'Izmeni';
  editBtn.setAttribute('data-agencijaId',agencijaId);
  editBtn.onclick = showEditPageA;

  let editTd = document.createElement('td');
  editTd.appendChild(editBtn);
  editBtn.classList.add("btn");
  editBtn.classList.add("btn-outline-success");
  agencijaTr.appendChild(editTd);

  let deleteBtn = document.createElement('button');
  deleteBtn.type='button';
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-outline-success");
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "white";
  deleteBtn.innerText = 'Obrisi';

  deleteBtn.setAttribute('data-agencijaId',agencijaId);
  deleteBtn.addEventListener("click", function(){
    deleteagencija(this.getAttribute("data-agencijaId"));
  });

  let deleteTd = document.createElement('td');
  deleteTd.appendChild(deleteBtn);
  agencijaTr.appendChild(deleteTd);

  let tbody = document.getElementById(tbodyId);
  tbody.appendChild(agencijaTr);
}

function showEditPageA(){
  let clickedBtn = this;

  let agencijaId = clickedBtn.getAttribute('data-agencijaId');
  window.location.href = 'izmeniAgencije.html?id='+ agencijaId;
}

function deleteagencija(agencija){
  let agencijaId = agencija;
  let naziv = "";

  var popupDiv = document.createElement("div");
  popupDiv.id = "obrisipopup";
  popupDiv.className = "obrisipopup";
  popupDiv.classList.add("active");

  var contentDiv = document.createElement("div");
  contentDiv.className = "popup-content";

  var heading = document.createElement("h2");
  heading.textContent = "Obriši agenciju?";

  var paragraph = document.createElement("p");

  var requestZaNaziv = new XMLHttpRequest();
  requestZaNaziv.onreadystatechange = function(){
    if(this.readyState==4){
      if(this.status==200){
        let agencije = JSON.parse(this.responseText);
        for (let id in agencije){
          let a = agencije[id];
          if (agencija == id){
            naziv = a.naziv;
            break;
          }
        }
        paragraph.textContent = "Da li ste sigurni da želite da obrišete agenciju " + naziv + "?";
      }
    }
  }
  requestZaNaziv.open("GET", firebaseUrl.concat("/agencije.json"));
  requestZaNaziv.send();

  var buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons";

  var potvrdiBtn = document.createElement("button");
  potvrdiBtn.textContent = "Potvrdi";

  potvrdiBtn.addEventListener("click", function() {
    let deleteRequest = new XMLHttpRequest();

    deleteRequest.onreadystatechange = function(){
      if(this.readyState==4){
        if (this.status==200){
          getAgencije();
          document.getElementById("obrisipopup").classList.remove("active");
          let popupDiv = document.getElementById("obrisipopup");
          popupDiv.remove();        }
      }
    }
    deleteRequest.open('DELETE',firebaseUrl.concat('/agencije/', agencijaId, '.json'));
    deleteRequest.send();
});

var otkaziBtn = document.createElement("button");
otkaziBtn.textContent = "Otkaži";
otkaziBtn.onclick = function(){
  document.getElementById("obrisipopup").classList.remove("active");
  let popupDiv = document.getElementById("obrisipopup");
  popupDiv.remove();
}

buttonsDiv.appendChild(potvrdiBtn);
buttonsDiv.appendChild(otkaziBtn);

contentDiv.appendChild(heading);
contentDiv.appendChild(paragraph);
contentDiv.appendChild(buttonsDiv);

popupDiv.appendChild(contentDiv);

document.body.appendChild(popupDiv);
}

function removeTableRows(tBodyId){
  let tBody = document.getElementById(tBodyId);

  while(tBody.firstChild){
      tBody.removeChild(tBody.lastChild);
  }
}